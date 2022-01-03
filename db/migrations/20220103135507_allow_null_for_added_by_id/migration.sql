-- DropForeignKey
ALTER TABLE "Article" DROP CONSTRAINT "Article_addedById_fkey";

-- AlterTable
ALTER TABLE "Article" ALTER COLUMN "addedById" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_addedById_fkey" FOREIGN KEY ("addedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
