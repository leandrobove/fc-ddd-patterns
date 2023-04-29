export interface CreateProductDtoInput {
    name: string;
    price: number;
}

export interface CreateProductDtoOutput {
    id: string;
    name: string;
    price: number;
}