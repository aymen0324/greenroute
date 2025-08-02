
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

    console.log('\n🎉 Sample data created successfully!');
    console.log('\n📋 Login credentials:');
    console.log('   Email: admin@greenroute.com');
    console.log('   Password: password123');
    console.log('\n🚀 You can now start the server with: npm run dev');

  } catch (error) {
    console.error('❌ Error creating sample data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createSampleData();
