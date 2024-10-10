-- CreateTable
CREATE TABLE "coupons" (
    "id" VARCHAR(8) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "discount_percentage" DECIMAL NOT NULL,
    "quantity_used" SMALLINT NOT NULL,
    "max_quantity_to_use" SMALLINT,
    "created_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "coupons_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "coupons_name_key" ON "coupons"("name");
