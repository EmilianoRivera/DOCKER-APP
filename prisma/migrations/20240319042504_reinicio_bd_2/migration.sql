/*
  Warnings:

  - Added the required column `rep_ubicacion` to the `Reportes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Reportes" DROP CONSTRAINT "Reportes_alc_id_fkey";

-- AlterTable
ALTER TABLE "Reportes" ADD COLUMN     "rep_ubicacion" TEXT NOT NULL;
