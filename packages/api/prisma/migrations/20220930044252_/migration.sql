-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_userDataId_fkey";

-- DropForeignKey
ALTER TABLE "usersDatas" DROP CONSTRAINT "usersDatas_userAddressId_fkey";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "userDataId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "usersDatas" ALTER COLUMN "userAddressId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "usersDatas" ADD CONSTRAINT "usersDatas_userAddressId_fkey" FOREIGN KEY ("userAddressId") REFERENCES "usersAddress"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_userDataId_fkey" FOREIGN KEY ("userDataId") REFERENCES "usersDatas"("id") ON DELETE SET NULL ON UPDATE CASCADE;
