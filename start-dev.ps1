docker volume rm cloudnative-bcs-group1_mongo_data -f 2>$null

python .\env.generator.py

$dockerProcess = Start-Process docker-compose `
    -ArgumentList "up --build mongo backend" `
    -NoNewWindow -PassThru

Set-Location .\frontend

npm install
npm run dev

try {
    Wait-Process -Id $dockerProcess.Id
}
finally {
    Write-Host "`nCtrl+C detected → shutting down docker-compose..."

    docker-compose down
}