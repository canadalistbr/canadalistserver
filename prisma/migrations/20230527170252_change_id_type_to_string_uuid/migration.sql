-- CreateTable
CREATE TABLE "Immigration" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "provinceId" INTEGER NOT NULL,

    CONSTRAINT "Immigration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProvinceOverview" (
    "id" TEXT NOT NULL,
    "province_id" INTEGER NOT NULL,
    "banner_url" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "ProvinceOverview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProvinceScores" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "emoji" TEXT NOT NULL,
    "overview_id" TEXT NOT NULL,

    CONSTRAINT "ProvinceScores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Provinces" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "capital" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "language" TEXT[],
    "top_cities" TEXT[],
    "immigration_ranking" INTEGER NOT NULL,
    "image_url" TEXT NOT NULL,
    "flag_url" TEXT NOT NULL,

    CONSTRAINT "Provinces_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Study" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "provinceId" INTEGER NOT NULL,
    "cityId" INTEGER NOT NULL,

    CONSTRAINT "Study_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cities" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "language" TEXT[],
    "image_url" TEXT NOT NULL,
    "cost_of_living" DOUBLE PRECISION NOT NULL,
    "overall_score" DOUBLE PRECISION NOT NULL,
    "provinceId" INTEGER NOT NULL,

    CONSTRAINT "cities_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProvinceOverview_province_id_key" ON "ProvinceOverview"("province_id");

-- AddForeignKey
ALTER TABLE "Immigration" ADD CONSTRAINT "Immigration_provinceId_fkey" FOREIGN KEY ("provinceId") REFERENCES "Provinces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProvinceOverview" ADD CONSTRAINT "ProvinceOverview_province_id_fkey" FOREIGN KEY ("province_id") REFERENCES "Provinces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProvinceScores" ADD CONSTRAINT "ProvinceScores_overview_id_fkey" FOREIGN KEY ("overview_id") REFERENCES "ProvinceOverview"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Study" ADD CONSTRAINT "Study_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "cities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Study" ADD CONSTRAINT "Study_provinceId_fkey" FOREIGN KEY ("provinceId") REFERENCES "Provinces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cities" ADD CONSTRAINT "cities_provinceId_fkey" FOREIGN KEY ("provinceId") REFERENCES "Provinces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
