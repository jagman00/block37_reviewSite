/*
  Warnings:

  - You are about to drop the column `item_id` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `ratings` on the `User` table. All the data in the column will be lost.
  - Added the required column `review_id` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_item_id_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "item_id",
ADD COLUMN     "review_id" INTEGER NOT NULL,
ALTER COLUMN "body" DROP NOT NULL,
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Item" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Review" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "ratings",
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_review_id_fkey" FOREIGN KEY ("review_id") REFERENCES "Review"("id") ON DELETE CASCADE ON UPDATE CASCADE;
