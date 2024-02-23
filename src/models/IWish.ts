import { Dayjs } from 'dayjs';

interface IImage {
    id: string;
    path: string;

}

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