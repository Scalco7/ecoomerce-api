import { ProductsService } from "../services/products.service";
import { ProductSection } from "../types/products.types";

export class ProductsController {
    private productsService: ProductsService;

    constructor() {
        this.productsService = new ProductsService()
    }

    public async getProductsBySection(): Promise<ProductSection[]> {
        const products = await this.productsService.getProductsBySection()
        return products
    }
}