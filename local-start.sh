#!/bin/bash
set -e
python env.generator.py
docker compose up --build mongo backend
cd frontend
npm install
npm run dev