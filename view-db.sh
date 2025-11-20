#!/bin/bash

# MongoDB Database Viewer - Quick Commands

echo "🗄️  MongoDB Database Viewer"
echo "=========================="
echo ""
echo "Database: bagstore"
echo "Connection: mongodb://localhost:27017/bagstore"
echo ""

# Show all products
echo "📦 Products in Database:"
echo "------------------------"
mongosh bagstore --quiet --eval "db.products.find().forEach(p => print('- ' + p.name + ' ($' + p.price + ') - ' + p.category))"

echo ""
echo "📊 Collection Stats:"
echo "-------------------"
mongosh bagstore --quiet --eval "print('Products: ' + db.products.countDocuments())"
mongosh bagstore --quiet --eval "print('Users: ' + db.users.countDocuments())"
mongosh bagstore --quiet --eval "print('Orders: ' + db.orders.countDocuments())"

echo ""
echo "💡 To view full data, use MongoDB Compass GUI"
echo "   Connection: mongodb://localhost:27017"
