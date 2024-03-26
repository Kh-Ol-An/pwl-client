import { ICurrentAvatar, IUser } from '@/models/IUser';

export interface ILogin {
    email: string;
    password: string;
}

export interface IRegistration extends ILogin {
    firstName: string;
}

export interface IUpdateMyUser {
    id: IUser['id'];
    firstName: string;
    lastName?: string;
    birthday?: string;
    avatar: ICurrentAvatar;
}

export interface IDeleteMyUser extends ILogin {
    id: IUser['id'];
}

export interface IAddFriend {
    myId: IUser['id'];
    friendId: IUser['id'];
}

export interface IRemoveFriend extends IAddFriend {
    whereRemove: 'friends' | 'followFrom' | 'followTo';
}
