-- DropForeignKey
ALTER TABLE "ReviewAnswers" DROP CONSTRAINT "ReviewAnswers_userId_fkey";

-- AddForeignKey
ALTER TABLE "ReviewAnswers" ADD CONSTRAINT "ReviewAnswers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
