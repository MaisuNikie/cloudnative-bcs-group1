python .\env.generator.py

$dockerProcess = Start-Process docker-compose `
    -ArgumentList "up --build" `
    -NoNewWindow -PassThru

try {
    Wait-Process -Id $dockerProcess.Id
}
finally {
    Write-Host "`nCtrl+C detected → shutting down docker-compose..."

    docker compose down
}