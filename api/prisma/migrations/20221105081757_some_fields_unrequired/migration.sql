-- DropForeignKey
ALTER TABLE "Progress" DROP CONSTRAINT "Progress_lastPageId_fkey";

-- AlterTable
ALTER TABLE "Progress" ALTER COLUMN "lastPageId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Progress" ADD CONSTRAINT "Progress_lastPageId_fkey" FOREIGN KEY ("lastPageId") REFERENCES "Page"("id") ON DELETE SET NULL ON UPDATE CASCADE;
