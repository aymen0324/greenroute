import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  try {
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

    console.log('✅ Database seeded successfully!');
    console.log(`
🎯 Sample data created:
   • 3 Users (1 Admin, 2 Drivers)

🔐 Login credentials:
   Admin: admin@greenroute.com / admin123
   Driver 1: maria.garcia@greenroute.com / driver123
   Driver 2: carlos.lopez@greenroute.com / driver123
    `);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
