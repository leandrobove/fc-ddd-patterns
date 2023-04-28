export interface FindCustomerDtoInput {
    id: string; 
}

export interface FindCustomerDtoOutput {
    id: string; 
    name: string;
    address: {
        street: string;
        number: number;
        zip: string;
        city: string;
    };
}