/*
  Warnings:

  - You are about to drop the column `cartId` on the `products` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_cartId_fkey";

-- AlterTable
ALTER TABLE "carts" ADD COLUMN     "products" TEXT[];

-- AlterTable
ALTER TABLE "products" DROP COLUMN "cartId";
