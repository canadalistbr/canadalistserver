-- AddForeignKey
ALTER TABLE "ProvinceOverview" ADD CONSTRAINT "ProvinceOverview_province_id_fkey" FOREIGN KEY ("province_id") REFERENCES "Province"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
