import { Dayjs } from 'dayjs';

export interface IImage {
    id: string;
    path: string;
    position: number;
    delete?: boolean;
}

export type ICurrentImage = (File | IImage);

export interface IWish {
    id: string;
    material: boolean;
    name: string;
    price?: string;
    link?: string;
    description: string;
    images: IImage[];
    createdAt: Dayjs;
    updatedAt: Dayjs;
}
