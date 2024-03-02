import { Dayjs } from 'dayjs';

export interface IImage {
    id: string;
    path: string;
    name: string;
}

export type ICurrentImage = (File | 'delete' | IImage);

export interface IWish {
    id: string;
    name: string;
    price: string;
    description: string;
    images: IImage[];
    link: boolean;
    createdAt: Dayjs;
    updatedAt: Dayjs;
}
