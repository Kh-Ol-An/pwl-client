import { Dayjs } from 'dayjs';

export interface IImage {
    id: string;
    path: string;
    position: string;
    delete?: boolean;
}

export type ICurrentImage = (File | IImage);

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