/*
  Warnings:

  - The primary key for the `Provinces` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Study` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `cities` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Immigration" DROP CONSTRAINT "Immigration_provinceId_fkey";

-- DropForeignKey
ALTER TABLE "ProvinceOverview" DROP CONSTRAINT "ProvinceOverview_province_id_fkey";

-- DropForeignKey
ALTER TABLE "Study" DROP CONSTRAINT "Study_cityId_fkey";

-- DropForeignKey
ALTER TABLE "Study" DROP CONSTRAINT "Study_provinceId_fkey";

-- DropForeignKey
ALTER TABLE "cities" DROP CONSTRAINT "cities_provinceId_fkey";

-- AlterTable
ALTER TABLE "Immigration" ALTER COLUMN "provinceId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "ProvinceOverview" ALTER COLUMN "province_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Provinces" DROP CONSTRAINT "Provinces_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Provinces_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Provinces_id_seq";

-- AlterTable
ALTER TABLE "Study" DROP CONSTRAINT "Study_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "provinceId" SET DATA TYPE TEXT,
ALTER COLUMN "cityId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Study_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Study_id_seq";

-- AlterTable
ALTER TABLE "cities" DROP CONSTRAINT "cities_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "provinceId" SET DATA TYPE TEXT,
ADD CONSTRAINT "cities_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "cities_id_seq";

-- AddForeignKey
ALTER TABLE "Immigration" ADD CONSTRAINT "Immigration_provinceId_fkey" FOREIGN KEY ("provinceId") REFERENCES "Provinces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProvinceOverview" ADD CONSTRAINT "ProvinceOverview_province_id_fkey" FOREIGN KEY ("province_id") REFERENCES "Provinces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Study" ADD CONSTRAINT "Study_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "cities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Study" ADD CONSTRAINT "Study_provinceId_fkey" FOREIGN KEY ("provinceId") REFERENCES "Provinces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cities" ADD CONSTRAINT "cities_provinceId_fkey" FOREIGN KEY ("provinceId") REFERENCES "Provinces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
