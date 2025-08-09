/*
  Warnings:

  - You are about to drop the column `price` on the `Cargo` table. All the data in the column will be lost.
  - The `status` column on the `Cargo` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `updatedAt` to the `Cargo` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CargoType" AS ENUM ('GENERAL', 'FRAGILE', 'LIQUID', 'REFRIGERATED', 'HAZARDOUS', 'BULK', 'CONTAINER', 'PALLETS');

-- CreateEnum
CREATE TYPE "VehicleType" AS ENUM ('TRUCK', 'VAN', 'TRAILER', 'FLATBED', 'REFRIGERATED');

-- CreateEnum
CREATE TYPE "UrgencyLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT');

-- CreateEnum
CREATE TYPE "CargoStatus" AS ENUM ('DRAFT', 'ACTIVE', 'QUOTED', 'ASSIGNED', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "QuoteStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "DealStatus" AS ENUM ('CONFIRMED', 'IN_TRANSIT', 'DELIVERED', 'DISPUTED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "MessageType" AS ENUM ('TEXT', 'IMAGE', 'FILE');

-- CreateEnum
CREATE TYPE "VehicleStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'MAINTENANCE');

-- CreateEnum
CREATE TYPE "EmailFrequency" AS ENUM ('INSTANT', 'DAILY', 'WEEKLY', 'NEVER');

-- CreateEnum
CREATE TYPE "Theme" AS ENUM ('LIGHT', 'DARK', 'AUTO');

-- AlterTable
ALTER TABLE "Cargo" DROP COLUMN "price",
ADD COLUMN     "deliveryDate" TIMESTAMP(3),
ADD COLUMN     "description" TEXT,
ADD COLUMN     "fromAddress" TEXT,
ADD COLUMN     "fromCity" TEXT,
ADD COLUMN     "fromCountry" TEXT,
ADD COLUMN     "fromPostal" TEXT,
ADD COLUMN     "images" JSONB,
ADD COLUMN     "loadingDate" TIMESTAMP(3),
ADD COLUMN     "pricePerKg" DECIMAL(65,30),
ADD COLUMN     "toAddress" TEXT,
ADD COLUMN     "toCity" TEXT,
ADD COLUMN     "toCountry" TEXT,
ADD COLUMN     "toPostal" TEXT,
ADD COLUMN     "totalPrice" DECIMAL(65,30),
ADD COLUMN     "type" "CargoType" NOT NULL DEFAULT 'GENERAL',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "urgency" "UrgencyLevel" NOT NULL DEFAULT 'MEDIUM',
ADD COLUMN     "vehicleType" "VehicleType",
ADD COLUMN     "viewCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "volume" DOUBLE PRECISION,
DROP COLUMN "status",
ADD COLUMN     "status" "CargoStatus" NOT NULL DEFAULT 'ACTIVE';

-- CreateTable
CREATE TABLE "Quote" (
    "id" TEXT NOT NULL,
    "cargoId" TEXT NOT NULL,
    "transporterId" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "estimatedDays" INTEGER NOT NULL,
    "message" TEXT,
    "status" "QuoteStatus" NOT NULL DEFAULT 'PENDING',
    "aiGenerated" BOOLEAN NOT NULL DEFAULT false,
    "confidence" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3),

    CONSTRAINT "Quote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Deal" (
    "id" TEXT NOT NULL,
    "cargoId" TEXT NOT NULL,
    "quoteId" TEXT NOT NULL,
    "shipperId" TEXT NOT NULL,
    "transporterId" TEXT NOT NULL,
    "status" "DealStatus" NOT NULL DEFAULT 'CONFIRMED',
    "progress" INTEGER NOT NULL DEFAULT 0,
    "timeline" JSONB,
    "totalAmount" DECIMAL(65,30),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "Deal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatThread" (
    "id" TEXT NOT NULL,
    "dealId" TEXT,
    "quoteId" TEXT,
    "participants" JSONB NOT NULL,
    "lastMessageAt" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "ChatThread_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatMessage" (
    "id" TEXT NOT NULL,
    "threadId" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "messageType" "MessageType" NOT NULL DEFAULT 'TEXT',
    "readAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChatMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "type" "VehicleType" NOT NULL,
    "licensePlate" TEXT NOT NULL,
    "capacity" JSONB,
    "gpsDeviceId" TEXT,
    "manualPosition" JSONB,
    "driverId" TEXT,
    "status" "VehicleStatus" NOT NULL DEFAULT 'ACTIVE',
    "currentCargoId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VehicleLocation" (
    "id" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "lat" DECIMAL(65,30) NOT NULL,
    "long" DECIMAL(65,30) NOT NULL,
    "speed" DECIMAL(65,30),
    "heading" INTEGER,
    "accuracy" DECIMAL(65,30),
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VehicleLocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CostSettings" (
    "userId" TEXT NOT NULL,
    "driverPay" DECIMAL(65,30) NOT NULL,
    "fuel" DECIMAL(65,30) NOT NULL,
    "maintenance" DECIMAL(65,30) NOT NULL,
    "tolls" DECIMAL(65,30) NOT NULL,
    "insurance" DECIMAL(65,30) NOT NULL,
    "baseMargin" DECIMAL(65,30) NOT NULL,
    "totalBaseCost" DECIMAL(65,30),
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CostSettings_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "NotificationSettings" (
    "userId" TEXT NOT NULL,
    "emailNotifications" JSONB,
    "pushNotifications" JSONB,
    "inAppNotifications" JSONB,
    "emailFrequency" "EmailFrequency" NOT NULL DEFAULT 'INSTANT',
    "quietHours" JSONB,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NotificationSettings_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "UserSettings" (
    "userId" TEXT NOT NULL,
    "preferences" JSONB,
    "theme" "Theme" NOT NULL DEFAULT 'DARK',
    "privacy" JSONB,
    "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserSettings_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Deal_cargoId_key" ON "Deal"("cargoId");

-- CreateIndex
CREATE UNIQUE INDEX "Deal_quoteId_key" ON "Deal"("quoteId");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_ownerId_licensePlate_key" ON "Vehicle"("ownerId", "licensePlate");

-- AddForeignKey
ALTER TABLE "Quote" ADD CONSTRAINT "Quote_cargoId_fkey" FOREIGN KEY ("cargoId") REFERENCES "Cargo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quote" ADD CONSTRAINT "Quote_transporterId_fkey" FOREIGN KEY ("transporterId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deal" ADD CONSTRAINT "Deal_cargoId_fkey" FOREIGN KEY ("cargoId") REFERENCES "Cargo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deal" ADD CONSTRAINT "Deal_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "Quote"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deal" ADD CONSTRAINT "Deal_shipperId_fkey" FOREIGN KEY ("shipperId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deal" ADD CONSTRAINT "Deal_transporterId_fkey" FOREIGN KEY ("transporterId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatThread" ADD CONSTRAINT "ChatThread_dealId_fkey" FOREIGN KEY ("dealId") REFERENCES "Deal"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatThread" ADD CONSTRAINT "ChatThread_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "Quote"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatMessage" ADD CONSTRAINT "ChatMessage_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "ChatThread"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatMessage" ADD CONSTRAINT "ChatMessage_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_currentCargoId_fkey" FOREIGN KEY ("currentCargoId") REFERENCES "Cargo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VehicleLocation" ADD CONSTRAINT "VehicleLocation_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CostSettings" ADD CONSTRAINT "CostSettings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotificationSettings" ADD CONSTRAINT "NotificationSettings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSettings" ADD CONSTRAINT "UserSettings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
