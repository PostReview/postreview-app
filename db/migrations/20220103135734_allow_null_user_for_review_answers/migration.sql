-- DropForeignKey
ALTER TABLE "ReviewAnswers" DROP CONSTRAINT "ReviewAnswers_userId_fkey";

-- AlterTable
ALTER TABLE "ReviewAnswers" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ReviewAnswers" ADD CONSTRAINT "ReviewAnswers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
