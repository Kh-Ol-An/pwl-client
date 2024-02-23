export interface ICreateWish {
    userId: string;
    name: string;
    price: string;
    description: string;
    images: File[] | null | string[];
}
