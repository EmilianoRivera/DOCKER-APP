/*
  Warnings:

  - You are about to drop the column `nomu_fb_uid` on the `Nombre_Usuario` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Nombre_Usuario" DROP COLUMN "nomu_fb_uid";

-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "usu_fb_uid" TEXT NOT NULL DEFAULT '';
