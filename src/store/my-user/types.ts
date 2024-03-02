import { ICurrentAvatar } from '../../models/IUser';

export interface ILogin {
    email: string;
    password: string;
}

export interface IRegistration extends ILogin {
    name: string;
}

export interface IUpdateMyUser {
    id: string;
    name: string;
    birthday: string;
    avatar: ICurrentAvatar;
}
