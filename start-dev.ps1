#!/usr/bin/env pwsh
$ErrorActionPreference = "Stop"

$FrontendLog = "$env:TEMP\frontend-dev.log"
$FrontendUrl = ""
$VerboseMode = $false

if ($args.Count -gt 0 -and $args[0] -eq "--verbose") {
    $VerboseMode = $true
}

function Print-Status {
    Write-Host "================ DEV STATUS ================"
    Write-Host "Frontend : $(if ($FrontendUrl) { $FrontendUrl } else { '<detecting...>' })"
    Write-Host "Backend  : Running (Docker)"
    Write-Host "Database : Running (Docker)"
    Write-Host "============================================"
}

$global:FrontendProcess = $null
$global:TailJob = $null

function Cleanup {
    Write-Host "Stopping development environment..."

    if ($global:FrontendProcess -and !$global:FrontendProcess.HasExited) {
        $global:FrontendProcess.Kill()
    }

    if ($global:TailJob) {
        Stop-Job $global:TailJob -Force
        Remove-Job $global:TailJob
    }

    docker compose down | Out-Null

    Write-Host ""
    Print-Status
    exit
}

Register-EngineEvent PowerShell.Exiting -Action { Cleanup }

Write-Host "Generating environment..."
python env.generator.py

Write-Host "Starting backend + database..."
docker compose up -d --build mongo backend --quiet-pull

Print-Status

Write-Host "Starting frontend..."
Set-Location frontend

"" | Out-File $FrontendLog -Encoding utf8

if ($VerboseMode) {
    npm install
    $global:FrontendProcess = Start-Process npm -ArgumentList "run","dev" -RedirectStandardOutput $FrontendLog -RedirectStandardError $FrontendLog -PassThru

    $global:TailJob = Start-Job -ScriptBlock {
        Get-Content $using:FrontendLog -Wait
    }
}
else {
    npm install | Out-Null
    $global:FrontendProcess = Start-Process npm -ArgumentList "run","dev" -RedirectStandardOutput $FrontendLog -RedirectStandardError $FrontendLog -PassThru
}

Set-Location ..

Start-Sleep -Seconds 2

$UrlRegex = "http://\S+"

while ($true) {
    if (-not $FrontendUrl -and (Test-Path $FrontendLog)) {
        $content = Get-Content $FrontendLog -Raw
        $match = [regex]::Match($content, $UrlRegex)
        if ($match.Success) {
            $FrontendUrl = $match.Value
            Print-Status
        }
    }

    if ($global:FrontendProcess.HasExited) {
        Write-Host "Frontend crashed. Restarting..."

        Set-Location frontend
        "" | Out-File $FrontendLog -Encoding utf8

        $global:FrontendProcess = Start-Process npm -ArgumentList "run","dev" -RedirectStandardOutput $FrontendLog -RedirectStandardError $FrontendLog -PassThru

        Set-Location ..
    }

    Start-Sleep -Seconds 2
}
