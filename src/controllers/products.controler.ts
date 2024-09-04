export class ProductsController {
    private productsService: [];

    constructor() {
        this.productsService = []
    }

    public async getProductsBySection() {
        const products = await this.productsService
        return products
    }
}