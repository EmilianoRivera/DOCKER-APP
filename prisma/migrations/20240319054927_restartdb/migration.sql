-- CreateTable
CREATE TABLE "Nombre_Usuario" (
    "nomu_id" SERIAL NOT NULL,
    "nomu_nombre" TEXT,
    "nomu_appat" TEXT,
    "nomu_apmat" TEXT,
    "nomu_fb_uid" TEXT NOT NULL,

    CONSTRAINT "Nombre_Usuario_pkey" PRIMARY KEY ("nomu_id")
);

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_nomu_id_fkey" FOREIGN KEY ("nomu_id") REFERENCES "Nombre_Usuario"("nomu_id") ON DELETE RESTRICT ON UPDATE CASCADE;
