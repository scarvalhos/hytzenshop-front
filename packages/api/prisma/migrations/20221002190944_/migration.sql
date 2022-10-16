/*
  Warnings:

  - You are about to drop the column `productId` on the `files` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "files" DROP CONSTRAINT "files_productId_fkey";

-- AlterTable
ALTER TABLE "files" DROP COLUMN "productId";

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "images" TEXT[];
