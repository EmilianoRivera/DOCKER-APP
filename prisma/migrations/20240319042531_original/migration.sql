-- AddForeignKey
ALTER TABLE "Reportes" ADD CONSTRAINT "Reportes_alc_id_fkey" FOREIGN KEY ("alc_id") REFERENCES "Alcaldia"("alc_id") ON DELETE RESTRICT ON UPDATE CASCADE;
