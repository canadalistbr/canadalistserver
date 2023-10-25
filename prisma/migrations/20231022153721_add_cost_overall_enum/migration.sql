-- CreateEnum
CREATE TYPE "CostOverall" AS ENUM ('High', 'Low', 'Medium');

-- AlterTable
ALTER TABLE "City" ADD COLUMN     "costOverall" "CostOverall" NOT NULL DEFAULT 'High';
