import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { UpdateProductDtoInput, UpdateProductDtoOutput } from "./update.product.dto";

export default class UpdateProductUseCase {

    private productRepository: ProductRepositoryInterface;

    constructor(productRepository: ProductRepositoryInterface) {
        this.productRepository = productRepository;
    }

    async execute(input: UpdateProductDtoInput): Promise<UpdateProductDtoOutput> {
        const product = await this.productRepository.find(input.id);

        product.changeName(input.name);
        product.changePrice(input.price);

        return {
            id: product.id,
            name: product.name,
            price: product.price,
        };
    }
}