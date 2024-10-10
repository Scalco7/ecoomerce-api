/*
  Warnings:

  - You are about to drop the `coupons` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "coupons";

-- CreateTable
CREATE TABLE "coupon" (
    "id" VARCHAR(17) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "discount_percentage" DECIMAL NOT NULL,
    "quantity_used" SMALLINT NOT NULL,
    "max_quantity_to_use" SMALLINT,
    "created_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "coupon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order" (
    "id" VARCHAR(17) NOT NULL,
    "created_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "state" VARCHAR(30) NOT NULL,
    "payer_name" VARCHAR(100) NOT NULL,
    "payer_email" VARCHAR(100) NOT NULL,
    "payer_document_number" VARCHAR(20) NOT NULL,
    "payer_cellphone_number" VARCHAR(20) NOT NULL,
    "address_postal_code" VARCHAR(20) NOT NULL,
    "address_country" VARCHAR(50) NOT NULL,
    "address_state" VARCHAR(50) NOT NULL,
    "address_city" VARCHAR(50) NOT NULL,
    "address_neighborhood" VARCHAR(50) NOT NULL,
    "address_street" VARCHAR(100) NOT NULL,
    "address_number" VARCHAR(10) NOT NULL,
    "address_complement" VARCHAR(100),

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_product" (
    "id" VARCHAR(17) NOT NULL,
    "product_id" VARCHAR(17) NOT NULL,
    "order_id" VARCHAR(17) NOT NULL,

    CONSTRAINT "order_product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "coupon_name_key" ON "coupon"("name");

-- RenameForeignKey
ALTER TABLE "product_image" RENAME CONSTRAINT "product_id_PK" TO "product_id_FK";

-- AddForeignKey
ALTER TABLE "product_type" ADD CONSTRAINT "category_id_FK" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_product" ADD CONSTRAINT "product_order_product_id_FK" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_product" ADD CONSTRAINT "order_order_product_id_FK" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
