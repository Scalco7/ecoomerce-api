export class ProductsController {
    private productsService: [];

    constructor() {
        this.productsService = []
    }

    public async getProducts() {
        const products = await this.productsService
        return products
    }
}