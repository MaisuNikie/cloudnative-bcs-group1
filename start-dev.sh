#!/bin/bash
docker volume rm cloudnative-bcs-group1_mongo_data

python env.generator.py

docker-compose up --build -d mongo backend

cd frontend
npm install
npm run dev
