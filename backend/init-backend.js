#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Initializing GreenRoute Backend...\n');

// Colors for console output
const colors = {
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function runCommand(command, description) {
  try {
    log(`📦 ${description}...`, 'blue');
    execSync(command, { stdio: 'inherit' });
    log(`✅ ${description} completed`, 'green');
  } catch (error) {
    log(`❌ ${description} failed: ${error.message}`, 'red');
    process.exit(1);
  }
}

// Check if we're in the backend directory
const backendDir = path.join(__dirname);
if (!fs.existsSync(path.join(backendDir, 'package.json'))) {
  log('❌ Please run this script from the backend directory', 'red');
  process.exit(1);
}

// Step 1: Install dependencies
log('\n🔧 Step 1: Installing dependencies...', 'yellow');
runCommand('npm install', 'Installing npm dependencies');

// Step 2: Generate Prisma client
log('\n🔧 Step 2: Setting up database...', 'yellow');
runCommand('npx prisma generate', 'Generating Prisma client');

// Step 3: Run database migrations
log('\n🔧 Step 3: Running database migrations...', 'yellow');
runCommand('npx prisma migrate dev --name init', 'Running database migrations');

// Step 4: Seed the database
log('\n🔧 Step 4: Seeding database with sample data...', 'yellow');
runCommand('npm run db:seed', 'Seeding database');

// Step 5: Build the project
log('\n🔧 Step 5: Building the project...', 'yellow');
runCommand('npm run build', 'Building TypeScript');

// Step 6: Create .env file if it doesn't exist
log('\n🔧 Step 6: Setting up environment...', 'yellow');
const envPath = path.join(backendDir, '.env');
const envExamplePath = path.join(backendDir, 'env.example');

if (!fs.existsSync(envPath) && fs.existsSync(envExamplePath)) {
  log('📝 Creating .env file from template...', 'blue');
  const envContent = fs.readFileSync(envExamplePath, 'utf8');
  fs.writeFileSync(envPath, envContent);
  log('✅ .env file created', 'green');
} else if (fs.existsSync(envPath)) {
  log('✅ .env file already exists', 'green');
} else {
  log('⚠️  No .env.example found, please create .env manually', 'yellow');
}

// Step 7: Create sample data script
log('\n🔧 Step 7: Creating sample data...', 'yellow');
const sampleDataScript = `
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function createSampleData() {
  try {
    console.log('🌱 Creating sample data...');

    // Create sample user
    const hashedPassword = await bcrypt.hash('password123', 10);
    const user = await prisma.user.upsert({
      where: { email: 'admin@greenroute.com' },
      update: {},
      create: {
        email: 'admin@greenroute.com',
        name: 'Admin User',
        password: hashedPassword,
        role: 'ADMIN',
        subscriptionTier: 'ENTERPRISE'
      }
    });

    console.log('✅ Created user:', user.email);

    // Create sample routes
    const routes = await Promise.all([
      prisma.route.create({
        data: {
          name: 'Madrid to Barcelona',
          startLocationLat: 40.4168,
          startLocationLng: -3.7038,
          startLocationAddress: 'Madrid, Spain',
          endLocationLat: 41.3851,
          endLocationLng: 2.1734,
          endLocationAddress: 'Barcelona, Spain',
          distanceKm: 625,
          estimatedDurationMinutes: 360,
          fuelConsumptionLiters: 45.2,
          co2EmissionsKg: 105.8,
          costEuros: 89.50,
          status: 'ACTIVE',
          optimizationLevel: 92.5,
          createdBy: user.id
        }
      }),
      prisma.route.create({
        data: {
          name: 'Valencia to Sevilla',
          startLocationLat: 39.4699,
          startLocationLng: -0.3763,
          startLocationAddress: 'Valencia, Spain',
          endLocationLat: 37.3891,
          endLocationLng: -5.9845,
          endLocationAddress: 'Sevilla, Spain',
          distanceKm: 520,
          estimatedDurationMinutes: 300,
          fuelConsumptionLiters: 38.1,
          co2EmissionsKg: 89.2,
          costEuros: 72.30,
          status: 'PLANNED',
          optimizationLevel: 88.7,
          createdBy: user.id
        }
      })
    ]);

    console.log('✅ Created routes:', routes.length);

    // Create sample vehicles
    const vehicles = await Promise.all([
      prisma.vehicle.create({
        data: {
          licensePlate: 'ABC-1234',
          model: 'Sprinter',
          manufacturer: 'Mercedes-Benz',
          year: 2022,
          fuelType: 'DIESEL',
          fuelCapacityLiters: 75,
          fuelConsumptionPer100km: 7.2,
          maxLoadKg: 3500,
          status: 'AVAILABLE',
          totalKmDriven: 45000,
          ownerId: user.id
        }
      }),
      prisma.vehicle.create({
        data: {
          licensePlate: 'XYZ-5678',
          model: 'Transit',
          manufacturer: 'Ford',
          year: 2021,
          fuelType: 'DIESEL',
          fuelCapacityLiters: 80,
          fuelConsumptionPer100km: 8.1,
          maxLoadKg: 3000,
          status: 'IN_TRANSIT',
          totalKmDriven: 32000,
          ownerId: user.id
        }
      })
    ]);

    console.log('✅ Created vehicles:', vehicles.length);

    // Create sample deliveries
    const deliveries = await Promise.all([
      prisma.delivery.create({
        data: {
          trackingNumber: 'DEL-001-2024',
          routeId: routes[0].id,
          vehicleId: vehicles[0].id,
          driverId: user.id,
          pickupLocationLat: 40.4168,
          pickupLocationLng: -3.7038,
          pickupLocationAddress: 'Madrid, Spain',
          deliveryLocationLat: 41.3851,
          deliveryLocationLng: 2.1734,
          deliveryLocationAddress: 'Barcelona, Spain',
          status: 'IN_TRANSIT',
          priority: 'HIGH',
          customerName: 'TechCorp Spain',
          customerEmail: 'logistics@techcorp.es'
        }
      }),
      prisma.delivery.create({
        data: {
          trackingNumber: 'DEL-002-2024',
          routeId: routes[1].id,
          vehicleId: vehicles[1].id,
          driverId: user.id,
          pickupLocationLat: 39.4699,
          pickupLocationLng: -0.3763,
          pickupLocationAddress: 'Valencia, Spain',
          deliveryLocationLat: 37.3891,
          deliveryLocationLng: -5.9845,
          deliveryLocationAddress: 'Sevilla, Spain',
          status: 'PENDING',
          priority: 'MEDIUM',
          customerName: 'GreenLogistics',
          customerEmail: 'orders@greenlogistics.com'
        }
      })
    ]);

    console.log('✅ Created deliveries:', deliveries.length);

    // Create sample analytics
    const analytics = await Promise.all([
      prisma.analytics.create({
        data: {
          routeId: routes[0].id,
          metricType: 'fuel_savings',
          value: 15.5,
          unit: 'liters',
          date: new Date().toISOString().split('T')[0]
        }
      }),
      prisma.analytics.create({
        data: {
          routeId: routes[0].id,
          metricType: 'co2_reduction',
          value: 36.2,
          unit: 'kg',
          date: new Date().toISOString().split('T')[0]
        }
      }),
      prisma.analytics.create({
        data: {
          routeId: routes[1].id,
          metricType: 'fuel_savings',
          value: 12.8,
          unit: 'liters',
          date: new Date().toISOString().split('T')[0]
        }
      })
    ]);

    console.log('✅ Created analytics records:', analytics.length);

    console.log('\\n🎉 Sample data created successfully!');
    console.log('\\n📋 Login credentials:');
    console.log('   Email: admin@greenroute.com');
    console.log('   Password: password123');
    console.log('\\n🚀 You can now start the server with: npm run dev');

  } catch (error) {
    console.error('❌ Error creating sample data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createSampleData();
`;

fs.writeFileSync(path.join(backendDir, 'create-sample-data.js'), sampleDataScript);
log('✅ Sample data script created', 'green');

// Step 8: Final instructions
log('\n🎉 Backend initialization completed!', 'green');
log('\n📋 Next steps:', 'yellow');
log('1. Start the development server: npm run dev', 'blue');
log('2. The API will be available at: http://localhost:3001', 'blue');
log('3. Health check endpoint: http://localhost:3001/health', 'blue');
log('4. API documentation: Check the README.md file', 'blue');
log('\n🔑 Default login credentials:', 'yellow');
log('   Email: admin@greenroute.com', 'blue');
log('   Password: password123', 'blue');
log('\n💡 To create more sample data, run: node create-sample-data.js', 'blue');

log('\n🚀 Happy coding!', 'green'); 