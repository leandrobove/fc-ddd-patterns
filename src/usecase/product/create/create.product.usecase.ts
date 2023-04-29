import Product from "../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { CreateProductDtoInput, CreateProductDtoOutput } from "./create.product.dto";
import { v4 as uuid } from "uuid";

export default class CreateProductUseCase {

    private productRepository: ProductRepositoryInterface;

    constructor(productRepository: ProductRepositoryInterface) {
        this.productRepository = productRepository;
    }

    async execute(input: CreateProductDtoInput): Promise<CreateProductDtoOutput> {
        const productId = uuid();
        const product = new Product(productId, input.name, input.price);

        await this.productRepository.create(product);

        return {
            id: productId,
            name: product.name,
            price: product.price
        };
    }
}