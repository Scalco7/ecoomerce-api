/*
  Warnings:

  - Added the required column `category_id` to the `product_type` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "product_type" ADD COLUMN     "category_id" VARCHAR(8) NOT NULL;

-- CreateTable
CREATE TABLE "category" (
    "id" VARCHAR(8) NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);
