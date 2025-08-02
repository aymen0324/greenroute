-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'VIEWER',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "subscription_tier" TEXT NOT NULL DEFAULT 'FREE',
    "last_login_at" DATETIME,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "routes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "start_location_lat" REAL NOT NULL,
    "start_location_lng" REAL NOT NULL,
    "start_location_address" TEXT NOT NULL,
    "end_location_lat" REAL NOT NULL,
    "end_location_lng" REAL NOT NULL,
    "end_location_address" TEXT NOT NULL,
    "waypoints_data" TEXT,
    "distance_km" REAL,
    "estimated_duration_minutes" INTEGER,
    "actual_duration_minutes" INTEGER,
    "fuel_consumption_liters" REAL,
    "co2_emissions_kg" REAL,
    "cost_euros" REAL,
    "status" TEXT NOT NULL DEFAULT 'PLANNED',
    "optimization_level" REAL,
    "created_by" TEXT NOT NULL,
    "assigned_to" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "routes_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "routes_assigned_to_fkey" FOREIGN KEY ("assigned_to") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "vehicles" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "license_plate" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "manufacturer" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "fuel_type" TEXT,
    "fuel_capacity_liters" REAL,
    "fuel_consumption_per_100km" REAL,
    "max_load_kg" REAL,
    "current_location_lat" REAL,
    "current_location_lng" REAL,
    "current_location_timestamp" DATETIME,
    "status" TEXT NOT NULL DEFAULT 'AVAILABLE',
    "last_maintenance_km" INTEGER,
    "next_maintenance_km" INTEGER,
    "total_km_driven" REAL,
    "owner_id" TEXT NOT NULL,
    "current_route_id" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "vehicles_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "vehicles_current_route_id_fkey" FOREIGN KEY ("current_route_id") REFERENCES "routes" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "deliveries" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tracking_number" TEXT NOT NULL,
    "route_id" TEXT NOT NULL,
    "vehicle_id" TEXT,
    "driver_id" TEXT NOT NULL,
    "pickup_location_lat" REAL NOT NULL,
    "pickup_location_lng" REAL NOT NULL,
    "pickup_location_address" TEXT NOT NULL,
    "delivery_location_lat" REAL NOT NULL,
    "delivery_location_lng" REAL NOT NULL,
    "delivery_location_address" TEXT NOT NULL,
    "package_details" TEXT,
    "scheduled_pickup" DATETIME,
    "actual_pickup" DATETIME,
    "scheduled_delivery" DATETIME,
    "actual_delivery" DATETIME,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "priority" TEXT NOT NULL DEFAULT 'MEDIUM',
    "notes" TEXT,
    "customer_name" TEXT,
    "customer_phone" TEXT,
    "customer_email" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "deliveries_route_id_fkey" FOREIGN KEY ("route_id") REFERENCES "routes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "deliveries_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "deliveries_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "analytics" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "route_id" TEXT,
    "vehicle_id" TEXT,
    "metric_type" TEXT NOT NULL,
    "value" REAL NOT NULL,
    "unit" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "metadata" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "system_logs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "level" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "metadata" TEXT,
    "user_id" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_license_plate_key" ON "vehicles"("license_plate");

-- CreateIndex
CREATE UNIQUE INDEX "deliveries_tracking_number_key" ON "deliveries"("tracking_number");
