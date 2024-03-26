import { Dayjs } from 'dayjs';
import { IUser } from '@/models/IUser';

export interface IImage {
    id: string;
    path: string;
    position: number;
    delete?: boolean;
}

export type ICurrentImage = (File | IImage);

export interface IBooking {
    userId: IUser['id'];
    start: Dayjs;
    end: Dayjs;
}

export interface IWish {
    id: string;
    userId: IUser['id'];
    material: boolean;
    show: 'all' | 'friends' | 'nobody';
    name: string;
    price?: string;
    address?: string;
    description: string;
    images: IImage[];
    booking?: IBooking;
    createdAt: Dayjs;
    updatedAt: Dayjs;
}
