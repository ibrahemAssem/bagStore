#!/bin/bash

# Start the backend server
echo "Starting backend server on port 5001..."
cd server && npm run dev &
BACKEND_PID=$!

# Wait a bit for backend to start
sleep 2

# Start the frontend server
echo "Starting frontend server..."
cd .. && npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ Both servers are running!"
echo "   Backend:  http://localhost:5001"
echo "   Frontend: http://localhost:5173 (or check terminal output)"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for Ctrl+C
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait
