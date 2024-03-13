import { ICurrentImage } from '../../models/IWish';

export interface ICreateWish {
    userId: string;
    material: boolean;
    show: 'all' | 'friends' | 'nobody';
    name: string;
    price?: string;
    address?: string;
    description: string;
    images: ICurrentImage[];
}

export interface IUpdateWish extends ICreateWish {
    id: string;
}

export interface IGetWish {
    myId: string;
    userId: string;
}
