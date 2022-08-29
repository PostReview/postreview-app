/*
  Warnings:

  - You are about to drop the column `isOnborded` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "isOnborded",
ADD COLUMN     "isOnboarded" BOOLEAN NOT NULL DEFAULT false;
