#!/bin/bash

# Install dependencies if needed
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

echo "Activating virtual environment..."
source venv/bin/activate

echo "Installing dependencies..."
pip install -r requirements.txt

echo "Starting API server on http://localhost:8000..."
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
