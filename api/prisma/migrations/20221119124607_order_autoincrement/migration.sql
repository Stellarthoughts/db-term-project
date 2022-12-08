-- AlterTable
ALTER TABLE "Chapter" ADD COLUMN     "order" SERIAL NOT NULL;

-- AlterTable
CREATE SEQUENCE "page_order_seq";
ALTER TABLE "Page" ALTER COLUMN "order" SET DEFAULT nextval('page_order_seq');
ALTER SEQUENCE "page_order_seq" OWNED BY "Page"."order";

-- AlterTable
CREATE SEQUENCE "thread_order_seq";
ALTER TABLE "Thread" ALTER COLUMN "order" SET DEFAULT nextval('thread_order_seq');
ALTER SEQUENCE "thread_order_seq" OWNED BY "Thread"."order";
