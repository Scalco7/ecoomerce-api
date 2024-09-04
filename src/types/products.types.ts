interface Variant {
    id: string;
    name: string;
}

export interface VariantType {
    type: string;
    variants: Variant[];
}

export interface ProductItem {
    id: string;
    imgUrls: string[];
    price: number;
    promotionPrice: number;
    availableQuantity: number;
    variant1Id?: string;
    variant2Id?: string;
}

export interface ProductType {
    id: string;
    name: string;
    description: string;
    products: ProductItem[];
    variantType1?: VariantType;
    variantType2?: VariantType;
}

export interface ProductSection {
    name: string;
    productTypes: ProductType[];
}