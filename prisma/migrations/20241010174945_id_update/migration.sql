/*
  Warnings:

  - The primary key for the `category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `coupons` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `product_image` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `product_type` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_type_PK";

-- DropForeignKey
ALTER TABLE "product_image" DROP CONSTRAINT "product_id_PK";

-- AlterTable
ALTER TABLE "category" DROP CONSTRAINT "category_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(17),
ADD CONSTRAINT "category_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "coupons" DROP CONSTRAINT "coupons_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(17),
ADD CONSTRAINT "coupons_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "product" DROP CONSTRAINT "product_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(17),
ALTER COLUMN "product_type_id" SET DATA TYPE VARCHAR(17),
ADD CONSTRAINT "product_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "product_image" DROP CONSTRAINT "product_image_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(17),
ALTER COLUMN "product_id" SET DATA TYPE VARCHAR(17),
ADD CONSTRAINT "product_image_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "product_type" DROP CONSTRAINT "product_type_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(17),
ALTER COLUMN "category_id" SET DATA TYPE VARCHAR(17),
ADD CONSTRAINT "product_type_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_type_PK" FOREIGN KEY ("product_type_id") REFERENCES "product_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_image" ADD CONSTRAINT "product_id_PK" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
