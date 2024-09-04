-- CreateTable
CREATE TABLE "product" (
    "id" VARCHAR(8) NOT NULL,
    "product_type_id" VARCHAR(8) NOT NULL,
    "price" DECIMAL NOT NULL,
    "promotion_price" DECIMAL NOT NULL,
    "available_quantity" SMALLINT NOT NULL,
    "variant_1_name" VARCHAR(10),
    "variant_2_name" VARCHAR(10),

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_image" (
    "id" VARCHAR(8) NOT NULL,
    "product_id" VARCHAR(8) NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "product_image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_type" (
    "id" VARCHAR(8) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT NOT NULL,
    "variant_type_1_name" VARCHAR(10),
    "variant_type_2_name" VARCHAR(10),

    CONSTRAINT "product_type_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_type_PK" FOREIGN KEY ("product_type_id") REFERENCES "product_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_image" ADD CONSTRAINT "product_id_PK" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

