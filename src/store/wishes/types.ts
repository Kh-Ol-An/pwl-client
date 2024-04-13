import { ICurrentImage, IWish } from '@/models/IWish';
import { IUser } from '@/models/IUser';

export interface ICreateWish {
    userId: IUser['id'];
    material: IWish['material'];
    show: IWish['show'];
    currency: IWish['currency'];
    name: IWish['name'];
    price?: IWish['price'];
    address?: IWish['address'];
    description: IWish['description'];
    images: ICurrentImage[];
}

export interface IUpdateWish extends ICreateWish {
    id: IWish['id'];
}

export interface IGetWish {
    myId: IUser['id'];
    userId: IUser['id'];
}

export interface IActionWish {
    userId: IUser['id'];
    wishId: IWish['id'];
}

export interface IBookWish extends IActionWish {
    end: string;
}
