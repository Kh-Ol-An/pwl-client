import { ICurrentAvatar } from '../../models/IUser';

export interface ILogin {
    email: string;
    password: string;
}

export interface IRegistration extends ILogin {
    firstName: string;
}

export interface IUpdateMyUser {
    id: string;
    firstName: string;
    birthday: string;
    avatar: ICurrentAvatar;
}
