import { ProductItem, ProductSection, ProductType, Variant, VariantType } from "../types/products.types";
import { category, PrismaClient, product, product_image, product_type } from '@prisma/client'
import { generateRandomID } from "../utils/id.utils";

function addVariantToVariantType(variantType: VariantType | undefined, name: string | null): string | undefined {
    if (!variantType || !name) return

    const same = variantType.variants.find((vt: Variant) => vt.name == name)

    if (same) return same.id

    const variant: Variant = { id: generateRandomID(), name: name }

    variantType.variants.push(variant)
    return variant.id
}

function addDbProductToProductType(
    dbProduct: product,
    dbImages: product_image[],
    variantType1: VariantType | undefined,
    variantType2: VariantType | undefined,
): ProductItem | undefined {
    const variant1Id = addVariantToVariantType(variantType1, dbProduct.variant_1_name)
    const variant2Id = addVariantToVariantType(variantType2, dbProduct.variant_2_name)

    if ((variantType1 && !variant1Id) || (variantType2 && !variant2Id)) return

    const product: ProductItem = {
        id: dbProduct.id,
        imgUrls: dbImages.filter(img => img.product_id == dbProduct.id).map(img => img.url),
        price: dbProduct.price.toNumber(),
        promotionPrice: dbProduct.promotion_price.toNumber(),
        availableQuantity: dbProduct.available_quantity,
        variant1Id: variant1Id,
        variant2Id: variant2Id
    }

    return product
}

export class ProductsService {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient()
    }

    public async getProductsBySection(): Promise<ProductSection[]> {
        const dbCategories: category[] = await this.prisma.$queryRaw`
            SELECT 
                cat.id,
                cat.name
            FROM products.category cat
            INNER JOIN products.product_type pt ON cat.id = pt.category_id
            INNER JOIN products.product p ON pt.id = p.product_type_id
            WHERE p.available_quantity > 0
            GROUP BY cat.id;
            `
        const dbProducts: product[] = await this.prisma.product.findMany({ where: { available_quantity: { gt: 0 } } })
        const dbImages: product_image[] = await this.prisma.$queryRaw`
            SELECT * FROM product_image img
                INNER JOIN product p ON img.product_id = p.id
                WHERE p.available_quantity > 0;
            `
        const dbProductTypes: product_type[] = await this.prisma.$queryRaw`
            SELECT 
                pt.id,
                pt.name,
                pt.description,
                pt.variant_type_1_name,
                pt.variant_type_2_name,
                pt.category_id
            FROM products.product_type pt
            INNER JOIN products.product p ON pt.id = p.product_type_id
            WHERE p.available_quantity > 0
            GROUP BY pt.id;
            `

        const sections: ProductSection[] = dbCategories.map((category) => {
            const productTypes: ProductType[] = dbProductTypes.filter(pt => pt.category_id == category.id).map(pt => {
                const variantType1: VariantType | undefined = pt.variant_type_1_name ? { type: pt.variant_type_1_name, variants: [] } : undefined;
                const variantType2: VariantType | undefined = pt.variant_type_2_name ? { type: pt.variant_type_2_name, variants: [] } : undefined;

                const dbProductsFiltered = dbProducts.filter(dbProduct => dbProduct.product_type_id == pt.id)
                const products: ProductItem[] = dbProductsFiltered.map(dbProduct => addDbProductToProductType(dbProduct, dbImages, variantType1, variantType2)
                ).filter(p => !!p)

                const productType: ProductType = {
                    id: pt.id,
                    name: pt.name,
                    description: pt.description,
                    products: products,
                    variantType1: variantType1,
                    variantType2: variantType2,
                }

                return productType
            })

            const section: ProductSection = {
                name: category.name,
                productTypes: productTypes
            }

            return section
        })

        return sections
    }
}