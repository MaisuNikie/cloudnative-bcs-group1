#!/usr/bin/env bash
set -e

FRONTEND_URL=""
FRONTEND_LOG="/tmp/frontend-dev.log"
VERBOSE=0

[[ "$1" == "--verbose" ]] && VERBOSE=1

print_status() {
    echo "================ DEV SERVER STATUS ================"
    echo "Frontend : ${FRONTEND_URL:-<detecting...>}"
    echo "Backend  : Running (Docker)"
    echo "Database : Running (Docker)"
    echo "==================================================="
}

cleanup() {
    echo "Stopping development environment..."
    [[ -n "$FRONTEND_PID" ]] && kill "$FRONTEND_PID" 2>/dev/null || true

    # SHOW docker shutdown output
    docker compose down

    exit 0
}

trap cleanup SIGINT SIGTERM

echo "Generating environment..."
python env.generator.py

echo "Starting backend + database..."

if [[ $VERBOSE -eq 1 ]]; then
    # Show backend logs live
    docker compose up --build mongo backend --quiet-pull &
else
    # Silent backend startup
    docker compose up -d --build mongo backend --quiet-pull >/dev/null 2>&1
fi

echo "Starting frontend..."
cd frontend

> "$FRONTEND_LOG"

if [[ $VERBOSE -eq 1 ]]; then
    npm install
    npm run dev | tee "$FRONTEND_LOG" &
else
    npm install >/dev/null 2>&1
    npm run dev >"$FRONTEND_LOG" 2>&1 &
fi

FRONTEND_PID=$!
cd ..

# Detect frontend URL once
URL_REGEX="http://[^[:space:]]+"

while [[ -z "$FRONTEND_URL" ]]; do
    if [[ -f "$FRONTEND_LOG" ]]; then
        FRONTEND_URL=$(grep -Eo "$URL_REGEX" "$FRONTEND_LOG" | head -n 1 || true)
    fi
    sleep 1
done

print_status   # ONLY ONE STATUS PRINT

# Keep alive until Ctrl+C
while true; do
    sleep 5
done
