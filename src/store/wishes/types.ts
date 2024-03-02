import { ICurrentImage } from '../../models/IWish';

export interface ICreateWish {
    userId: string;
    name: string;
    price: string;
    description: string;
    images: ICurrentImage[];
}

export interface IUpdateWish extends ICreateWish {
    id: string;
}
