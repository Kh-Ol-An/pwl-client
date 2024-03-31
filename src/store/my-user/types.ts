import { ICurrentAvatar, IUser } from '@/models/IUser';

export interface IForgotPassword {
    email: IUser['email'];
}

export interface IChangeForgottenPassword {
    passwordResetLink: string;
    newPassword: string;
}

export interface ILogin extends IForgotPassword {
    password: string;
}

export interface IRegistration extends ILogin {
    firstName: IUser['firstName'];
}

export interface IChangePassword {
    userId: IUser['id'];
    oldPassword: string;
    newPassword: string;
}

export interface IUpdateMyUser {
    id: IUser['id'];
    firstName: IUser['firstName']
    lastName?: IUser['lastName'];
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
