-- CreateTable
CREATE TABLE "Immigration" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "provinceId" TEXT NOT NULL,

    CONSTRAINT "Immigration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProvinceOverview" (
    "id" TEXT NOT NULL,
    "province_id" TEXT NOT NULL,
    "banner_url" TEXT NOT NULL,

    CONSTRAINT "ProvinceOverview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProvinceScore" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "emoji" TEXT NOT NULL,
    "overview_id" TEXT NOT NULL,

    CONSTRAINT "ProvinceScore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Province" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "capital" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "language" TEXT[],
    "top_cities" TEXT[],
    "immigration_ranking" INTEGER NOT NULL,
    "image_url" TEXT NOT NULL,
    "flag_url" TEXT NOT NULL,

    CONSTRAINT "Province_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Study" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "province_id" TEXT NOT NULL,
    "city_id" TEXT NOT NULL,

    CONSTRAINT "Study_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "City" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "language" TEXT[],
    "image_url" TEXT NOT NULL,
    "cost_of_living" DOUBLE PRECISION NOT NULL,
    "overall_score" DOUBLE PRECISION NOT NULL,
    "province_id" TEXT NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProvinceOverview_province_id_key" ON "ProvinceOverview"("province_id");

-- AddForeignKey
ALTER TABLE "Immigration" ADD CONSTRAINT "Immigration_provinceId_fkey" FOREIGN KEY ("provinceId") REFERENCES "Province"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProvinceScore" ADD CONSTRAINT "ProvinceScore_overview_id_fkey" FOREIGN KEY ("overview_id") REFERENCES "ProvinceOverview"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Study" ADD CONSTRAINT "Study_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Study" ADD CONSTRAINT "Study_province_id_fkey" FOREIGN KEY ("province_id") REFERENCES "Province"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_province_id_fkey" FOREIGN KEY ("province_id") REFERENCES "Province"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
