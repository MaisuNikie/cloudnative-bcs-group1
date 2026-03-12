#!/bin/bash
python env.generator.py

docker-compose up --build -d
