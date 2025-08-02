import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing data
  await prisma.systemLog.deleteMany();
  await prisma.analytics.deleteMany();
  await prisma.delivery.deleteMany();
  await prisma.vehicle.deleteMany();
  await prisma.route.deleteMany();
  await prisma.user.deleteMany();

  console.log('🧹 Cleared existing data');

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.create({
    data: {
      email: 'admin@greenroute.com',
      name: 'Administrator',
      password: adminPassword,
      role: 'ADMIN',
      subscriptionTier: 'ENTERPRISE',
      isActive: true,
    },
  });

  // Create driver users
  const driverPassword = await bcrypt.hash('driver123', 10);
  const driver1 = await prisma.user.create({
    data: {
      email: 'maria.garcia@greenroute.com',
      name: 'María García',
      password: driverPassword,
      role: 'DRIVER',
      subscriptionTier: 'PRO',
      isActive: true,
    },
  });

  const driver2 = await prisma.user.create({
    data: {
      email: 'carlos.lopez@greenroute.com',
      name: 'Carlos López',
      password: driverPassword,
      role: 'DRIVER',
      subscriptionTier: 'PRO',
      isActive: true,
    },
  });

  console.log('👥 Created users');

  // Create vehicles
  const vehicle1 = await prisma.vehicle.create({
    data: {
      licensePlate: 'ABC-1234',
      model: 'Transit Connect',
      manufacturer: 'Ford',
      year: 2022,
      fuelType: 'DIESEL',
      fuelCapacityLiters: 65.0,
      fuelConsumptionPer100km: 6.5,
      maxLoadKg: 1200.0,
      currentLocationLat: 40.4168,
      currentLocationLng: -3.7038,
      currentLocationTimestamp: new Date(),
      status: 'AVAILABLE',
      lastMaintenanceKm: 15000,
      nextMaintenanceKm: 20000,
      totalKmDriven: 18500.0,
      ownerId: admin.id,
    },
  });

  const vehicle2 = await prisma.vehicle.create({
    data: {
      licensePlate: 'XYZ-5678',
      model: 'eVito',
      manufacturer: 'Mercedes',
      year: 2023,
      fuelType: 'ELECTRIC',
      fuelCapacityLiters: 0,
      fuelConsumptionPer100km: 0,
      maxLoadKg: 1050.0,
      currentLocationLat: 41.3851,
      currentLocationLng: 2.1734,
      currentLocationTimestamp: new Date(),
      status: 'IN_TRANSIT',
      lastMaintenanceKm: 8000,
      nextMaintenanceKm: 15000,
      totalKmDriven: 12300.0,
      ownerId: admin.id,
    },
  });

  const vehicle3 = await prisma.vehicle.create({
    data: {
      licensePlate: 'ECO-9999',
      model: 'eCrafter',
      manufacturer: 'Volkswagen',
      year: 2023,
      fuelType: 'ELECTRIC',
      fuelCapacityLiters: 0,
      fuelConsumptionPer100km: 0,
      maxLoadKg: 1700.0,
      currentLocationLat: 39.4699,
      currentLocationLng: -0.3763,
      currentLocationTimestamp: new Date(),
      status: 'AVAILABLE',
      lastMaintenanceKm: 5000,
      nextMaintenanceKm: 10000,
      totalKmDriven: 6800.0,
      ownerId: admin.id,
    },
  });

  console.log('🚛 Created vehicles');

  // Create routes
  const route1 = await prisma.route.create({
    data: {
      name: 'Madrid - Barcelona Express',
      startLocationLat: 40.4168,
      startLocationLng: -3.7038,
      startLocationAddress: 'Madrid, España',
      endLocationLat: 41.3851,
      endLocationLng: 2.1734,
      endLocationAddress: 'Barcelona, España',
      waypointsData: JSON.stringify([
        { lat: 40.9631, lng: -1.1115, address: 'Zaragoza, España' }
      ]),
      distanceKm: 621.0,
      estimatedDurationMinutes: 360,
      actualDurationMinutes: 350,
      fuelConsumptionLiters: 40.3,
      co2EmissionsKg: 106.8,
      costEuros: 89.50,
      status: 'COMPLETED',
      optimizationLevel: 85.5,
      createdBy: admin.id,
      assignedTo: driver1.id,
      vehicles: {
        connect: { id: vehicle1.id }
      }
    },
  });

  const route2 = await prisma.route.create({
    data: {
      name: 'Valencia - Sevilla Eco',
      startLocationLat: 39.4699,
      startLocationLng: -0.3763,
      startLocationAddress: 'Valencia, España',
      endLocationLat: 37.3886,
      endLocationLng: -5.9823,
      endLocationAddress: 'Sevilla, España',
      waypointsData: JSON.stringify([
        { lat: 38.9845, lng: -1.8585, address: 'Albacete, España' },
        { lat: 38.0882, lng: -3.6295, address: 'Jaén, España' }
      ]),
      distanceKm: 498.0,
      estimatedDurationMinutes: 300,
      status: 'ACTIVE',
      optimizationLevel: 92.3,
      createdBy: admin.id,
      assignedTo: driver2.id,
      vehicles: {
        connect: { id: vehicle3.id }
      }
    },
  });

  const route3 = await prisma.route.create({
    data: {
      name: 'Barcelona - Bilbao Green',
      startLocationLat: 41.3851,
      startLocationLng: 2.1734,
      startLocationAddress: 'Barcelona, España',
      endLocationLat: 43.2627,
      endLocationLng: -2.9253,
      endLocationAddress: 'Bilbao, España',
      waypointsData: JSON.stringify([
        { lat: 41.6561, lng: 0.8773, address: 'Lleida, España' },
        { lat: 42.3488, lng: -1.6361, address: 'Pamplona, España' }
      ]),
      distanceKm: 625.0,
      estimatedDurationMinutes: 380,
      status: 'PLANNED',
      optimizationLevel: 78.9,
      createdBy: admin.id,
    },
  });

  console.log('🛣️ Created routes');

  // Create deliveries
  const delivery1 = await prisma.delivery.create({
    data: {
      trackingNumber: 'GR2025001',
      routeId: route1.id,
      vehicleId: vehicle1.id,
      driverId: driver1.id,
      pickupLocationLat: 40.4168,
      pickupLocationLng: -3.7038,
      pickupLocationAddress: 'Centro Logístico Madrid, Calle Ejemplo 123',
      deliveryLocationLat: 41.3851,
      deliveryLocationLng: 2.1734,
      deliveryLocationAddress: 'Almacén Barcelona, Avda. Diagonal 456',
      packageDetails: JSON.stringify({
        weight: 850,
        dimensions: { length: 120, width: 80, height: 100 },
        type: 'Electrónicos',
        value: 15000
      }),
      scheduledPickup: new Date('2025-07-29T08:00:00Z'),
      actualPickup: new Date('2025-07-29T08:15:00Z'),
      scheduledDelivery: new Date('2025-07-29T18:00:00Z'),
      actualDelivery: new Date('2025-07-29T17:45:00Z'),
      status: 'DELIVERED',
      priority: 'HIGH',
      customerName: 'TechStore Barcelona S.L.',
      customerPhone: '+34 934 567 890',
      customerEmail: 'pedidos@techstore.es',
      notes: 'Entrega completada sin incidencias. Cliente muy satisfecho.',
    },
  });

  const delivery2 = await prisma.delivery.create({
    data: {
      trackingNumber: 'GR2025002',
      routeId: route2.id,
      vehicleId: vehicle3.id,
      driverId: driver2.id,
      pickupLocationLat: 39.4699,
      pickupLocationLng: -0.3763,
      pickupLocationAddress: 'Nave Industrial Valencia, Polígono Sur 789',
      deliveryLocationLat: 37.3886,
      deliveryLocationLng: -5.9823,
      deliveryLocationAddress: 'Centro Comercial Sevilla, Plaza Mayor 321',
      packageDetails: JSON.stringify({
        weight: 650,
        dimensions: { length: 100, width: 60, height: 80 },
        type: 'Textil',
        value: 8500
      }),
      scheduledPickup: new Date('2025-07-30T09:00:00Z'),
      actualPickup: new Date('2025-07-30T09:10:00Z'),
      scheduledDelivery: new Date('2025-07-30T16:00:00Z'),
      status: 'IN_TRANSIT',
      priority: 'MEDIUM',
      customerName: 'Moda Andaluza S.A.',
      customerPhone: '+34 954 123 456',
      customerEmail: 'logistica@modaandaluza.com',
      notes: 'Transporte en curso. ETA estimado: 16:30',
    },
  });

  console.log('📦 Created deliveries');

  // Create analytics data
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const lastWeek = new Date(today);
  lastWeek.setDate(lastWeek.getDate() - 7);

  await prisma.analytics.create({
    data: {
      routeId: route1.id,
      vehicleId: vehicle1.id,
      metricType: 'fuel_savings',
      value: 12.5,
      unit: 'liters',
      date: yesterday.toISOString().split('T')[0],
      metadata: JSON.stringify({
        originalConsumption: 52.8,
        optimizedConsumption: 40.3,
        savingsPercentage: 23.7
      }),
    },
  });

  await prisma.analytics.create({
    data: {
      routeId: route1.id,
      vehicleId: vehicle1.id,
      metricType: 'co2_reduction',
      value: 33.2,
      unit: 'kg',
      date: yesterday.toISOString().split('T')[0],
      metadata: JSON.stringify({
        originalEmissions: 140.0,
        optimizedEmissions: 106.8,
        reductionPercentage: 23.7
      }),
    },
  });

  await prisma.analytics.create({
    data: {
      routeId: route2.id,
      vehicleId: vehicle3.id,
      metricType: 'time_saved',
      value: 45,
      unit: 'minutes',
      date: today.toISOString().split('T')[0],
      metadata: JSON.stringify({
        originalDuration: 345,
        optimizedDuration: 300,
        savingsPercentage: 13.0
      }),
    },
  });

  await prisma.analytics.create({
    data: {
      metricType: 'cost_savings',
      value: 156.75,
      unit: 'euros',
      date: lastWeek.toISOString().split('T')[0],
      metadata: JSON.stringify({
        totalRoutes: 12,
        averageSavingsPerRoute: 13.06,
        cumulativeSavings: 1248.50
      }),
    },
  });

  console.log('📊 Created analytics data');

  // Create system logs
  await prisma.systemLog.create({
    data: {
      level: 'INFO',
      service: 'route-optimizer',
      message: 'Route optimization completed successfully',
      metadata: JSON.stringify({
        routeId: route1.id,
        optimizationTime: 1.2,
        improvementPercentage: 23.7
      }),
      userId: admin.id,
    },
  });

  await prisma.systemLog.create({
    data: {
      level: 'INFO',
      service: 'vehicle-tracker',
      message: 'Vehicle location updated',
      metadata: JSON.stringify({
        vehicleId: vehicle2.id,
        previousLocation: { lat: 41.3800, lng: 2.1700 },
        currentLocation: { lat: 41.3851, lng: 2.1734 }
      }),
    },
  });

  await prisma.systemLog.create({
    data: {
      level: 'WARN',
      service: 'maintenance-scheduler',
      message: 'Vehicle approaching maintenance threshold',
      metadata: JSON.stringify({
        vehicleId: vehicle1.id,
        currentKm: 18500,
        maintenanceKm: 20000,
        remainingKm: 1500
      }),
    },
  });

  console.log('📝 Created system logs');

  console.log('✅ Database seeded successfully!');
  console.log(`
🎯 Sample data created:
   • 3 Users (1 Admin, 2 Drivers)
   • 3 Vehicles (1 Diesel, 2 Electric)
   • 3 Routes (1 Completed, 1 Active, 1 Planned)
   • 2 Deliveries (1 Delivered, 1 In Transit)
   • 4 Analytics entries
   • 3 System logs

🔐 Login credentials:
   Admin: admin@greenroute.com / admin123
   Driver 1: maria.garcia@greenroute.com / driver123
   Driver 2: carlos.lopez@greenroute.com / driver123
  `);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
