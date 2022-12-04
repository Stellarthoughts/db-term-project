/*
  Warnings:

  - Made the column `entryId` on table `Chapter` required. This step will fail if there are existing NULL values in that column.
  - Made the column `pageId` on table `Thread` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Chapter" ALTER COLUMN "entryId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Thread" ALTER COLUMN "pageId" SET NOT NULL;
