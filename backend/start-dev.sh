#!/bin/bash

echo "🚀 Starting GreenRoute Backend..."
echo

# Check if .env exists, if not create from example
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file from example..."
    cp "env.example" ".env"
    echo "✅ .env file created!"
    echo
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo "✅ Dependencies installed!"
    echo
fi

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate
echo "✅ Prisma client generated!"
echo

# Run database migrations
echo "🗄️ Running database migrations..."
npx prisma migrate dev --name init
echo "✅ Database migrations completed!"
echo

# Start the development server
echo "🚀 Starting development server..."
echo "📍 Backend will be available at: http://localhost:3001"
echo "📍 Health check: http://localhost:3001/health"
echo "📍 API documentation: http://localhost:3001/"
echo
npm run dev 