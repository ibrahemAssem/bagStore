# Bag Store - Development Guide

## The Problem You Encountered

You were getting **403 Forbidden** errors because:

1. **Port 5000 is used by macOS** - Apple's AirPlay/Control Center service occupies port 5000
2. **Backend server wasn't running** - Running `npm run dev` only starts the frontend (Vite)
3. **Frontend couldn't reach the API** - It was hitting Apple's service instead of your backend

## The Solution

✅ **Changed backend port from 5000 to 5001** to avoid macOS conflict  
✅ **Updated frontend API URL** to use port 5001  
✅ **Backend server is now running** and serving data from MongoDB

## How to Run the Application

### Option 1: Use the convenience script (Recommended)
```bash
./start-dev.sh
```

### Option 2: Run servers separately

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

## Important URLs

- **Frontend**: http://localhost:5173 (or check Vite output)
- **Backend API**: http://localhost:5001
- **Products API**: http://localhost:5001/api/products

## Database

- **MongoDB** is running on `mongodb://localhost:27017/bagstore`
- **Current products in DB**: 6 products
- To seed more data: `cd server && node seeder.js`

## Troubleshooting

### If you get 403 Forbidden errors:
1. Make sure the backend server is running (`cd server && npm run dev`)
2. Check that MongoDB is running (`brew services list | grep mongodb`)
3. Verify the API URL in frontend uses port 5001, not 5000

### If port 5001 is also occupied:
1. Change `PORT` in `server/.env`
2. Update the API URL in `src/context/ProductContext.tsx`

### To check if MongoDB has data:
```bash
mongosh bagstore --eval "db.products.find().pretty()"
```

## Next Steps

Your application should now be working! The frontend will fetch products from the backend, which retrieves them from MongoDB.
