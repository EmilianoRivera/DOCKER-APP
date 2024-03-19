/*
  Warnings:

  - You are about to drop the `Nombre_Usuario` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `prueba` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Usuario" DROP CONSTRAINT "Usuario_nomu_id_fkey";

-- DropTable
DROP TABLE "Nombre_Usuario";

-- DropTable
DROP TABLE "prueba";
