/*
  Warnings:

  - You are about to drop the column `slug` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `Province` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `City` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Province` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "Winter" AS ENUM ('Mild', 'Cold', 'Freezing');

-- AlterTable
ALTER TABLE "City" DROP COLUMN "slug",
ADD COLUMN     "bike_friendly" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "entity" TEXT NOT NULL DEFAULT 'city',
ADD COLUMN     "festivals" TEXT NOT NULL DEFAULT 'Jazz Festival, Just for Laughs Comedy Festival, and many others',
ADD COLUMN     "immigration_destination_rank" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "industries" TEXT[] DEFAULT ARRAY['Technology', 'Tourism']::TEXT[],
ADD COLUMN     "nature" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "population" DOUBLE PRECISION NOT NULL DEFAULT 500000,
ADD COLUMN     "short" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "winter" "Winter" NOT NULL DEFAULT 'Cold';

-- AlterTable
ALTER TABLE "Province" DROP COLUMN "slug",
ADD COLUMN     "entity" TEXT NOT NULL DEFAULT 'province',
ADD COLUMN     "short" TEXT NOT NULL DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX "City_name_key" ON "City"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Province_name_key" ON "Province"("name");
