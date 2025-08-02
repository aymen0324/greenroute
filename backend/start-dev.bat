@echo off
echo 🚀 Starting GreenRoute Backend...
echo.

REM Check if .env exists, if not create from example
if not exist ".env" (
    echo 📝 Creating .env file from example...
    copy "env.example" ".env"
    echo ✅ .env file created!
    echo.
)

REM Install dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo 📦 Installing dependencies...
    npm install
    echo ✅ Dependencies installed!
    echo.
)

REM Generate Prisma client
echo 🔧 Generating Prisma client...
npx prisma generate
echo ✅ Prisma client generated!
echo.

REM Run database migrations
echo 🗄️ Running database migrations...
npx prisma migrate dev --name init
echo ✅ Database migrations completed!
echo.

REM Start the development server
echo 🚀 Starting development server...
echo 📍 Backend will be available at: http://localhost:3001
echo 📍 Health check: http://localhost:3001/health
echo 📍 API documentation: http://localhost:3001/
echo.
npm run dev 