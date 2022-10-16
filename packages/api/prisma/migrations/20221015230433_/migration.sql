-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_orderId_fkey";

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "products" TEXT[];
