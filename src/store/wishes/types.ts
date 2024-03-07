import { ICurrentImage } from '../../models/IWish';

export interface ICreateWish {
    userId: string;
    material: boolean;
    name: string;
    price: string;
    link: string;
    description: string;
    images: ICurrentImage[];
}

export interface IUpdateWish extends ICreateWish {
    id: string;
}
