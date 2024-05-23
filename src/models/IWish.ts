import { Dayjs } from 'dayjs';
import { IUser } from '@/models/IUser';

export interface IImage {
    id: string;
    path: string;
    position: number;
    delete?: boolean;
}

export type TCurrentImage = (File | IImage);

export interface IBooking {
    userId: IUser['id'];
    start: Dayjs;
    end: Dayjs;
}

interface IAddress {
    id: string;
    value: string;
}

export interface IWish {
    id: string;
    userId: IUser['id'];
    material: boolean;
    show: 'all' | 'friends' | 'nobody';
    currency: 'UAH' | 'USD' | 'EUR';
    name: string;
    price?: string;
    addresses?: IAddress[];
    description: string;
    executed: boolean;
    images: IImage[];
    booking?: IBooking;
    createdAt: Dayjs;
    updatedAt: Dayjs;
}
