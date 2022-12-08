-- DropForeignKey
ALTER TABLE "Chapter" DROP CONSTRAINT "Chapter_personalPageId_fkey";

-- DropForeignKey
ALTER TABLE "Entry" DROP CONSTRAINT "Entry_personalPageId_fkey";

-- AlterTable
ALTER TABLE "Chapter" ALTER COLUMN "personalPageId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Entry" ALTER COLUMN "personalPageId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Entry" ADD CONSTRAINT "Entry_personalPageId_fkey" FOREIGN KEY ("personalPageId") REFERENCES "Page"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chapter" ADD CONSTRAINT "Chapter_personalPageId_fkey" FOREIGN KEY ("personalPageId") REFERENCES "Page"("id") ON DELETE SET NULL ON UPDATE CASCADE;
