export interface ListProductDtoInput { }

type Product = {
    id: string;
    name: string;
    price: number;
};

export interface ListProductDtoOutput {
    products: Product[]
}