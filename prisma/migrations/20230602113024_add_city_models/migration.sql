-- CreateTable
CREATE TABLE "CityOverview" (
    "id" TEXT NOT NULL,
    "province_id" TEXT NOT NULL,
    "banner_url" TEXT NOT NULL,
    "emojis" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "CityOverview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CityScore" (
    "id" TEXT NOT NULL,
    "overview_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "score" DOUBLE PRECISION,
    "emoji" TEXT NOT NULL,

    CONSTRAINT "CityScore_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CityOverview_province_id_key" ON "CityOverview"("province_id");

-- AddForeignKey
ALTER TABLE "CityOverview" ADD CONSTRAINT "CityOverview_province_id_fkey" FOREIGN KEY ("province_id") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CityScore" ADD CONSTRAINT "CityScore_overview_id_fkey" FOREIGN KEY ("overview_id") REFERENCES "CityOverview"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
