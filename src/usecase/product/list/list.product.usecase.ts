import Product from "../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { ListProductDtoInput, ListProductDtoOutput } from "./list.product.dto";

export default class ListProductUseCase {

    private productRepository: ProductRepositoryInterface;

    constructor(productRepository: ProductRepositoryInterface) {
        this.productRepository = productRepository;
    }

    async execute(input: ListProductDtoInput): Promise<ListProductDtoOutput> {
        const productsEntity = await this.productRepository.findAll();

        return OutPutMapper.toOutput(productsEntity);
    }
}

class OutPutMapper {
    static toOutput(productsEntity: Product[]): ListProductDtoOutput {
        const products = {
            products: productsEntity.map(product => ({
                id: product.id,
                name: product.name,
                price: product.price,
            }))
        };
        return products;
    }
}