import { TCurrentAvatar, IUser, ELang } from '@/models/IUser';

export interface IForgotPassword {
    email: IUser['email'];
    lang: ELang;
}

export interface IChangeForgottenPassword {
    passwordResetLink: string;
    newPassword: string;
}

export interface ILogin {
    email: IUser['email'];
    password: string;
    lang: ELang;
}

export interface IGoogleAuth {
    email: IUser['email'];
    lang: ELang;
    isActivated: IUser['isActivated'];
    firstName: IUser['firstName'];
    lastName: IUser['lastName'];
    avatar: IUser['avatar'];
}

export interface IRegistration extends ILogin {
    firstName: IUser['firstName'];
}

export interface IUserId {
    userId: IUser['id'];
}

export interface IChangePassword extends IUserId {
    oldPassword: string;
    newPassword: string;
}

export interface IUpdateMyUser extends IUserId {
    firstName: IUser['firstName']
    lastName?: IUser['lastName'];
    avatar: TCurrentAvatar;
    deliveryAddress?: string;
    birthday?: string;
}

export interface IChangeLang extends IUserId {
    lang: ELang;
}

export interface INotificationSubscribe extends IUserId {
    subscription: PushSubscription;
}

export interface IDeleteMyUser extends IUserId {
    email: IUser['email'];
    password: string;
}

export interface IAddFriend {
    myId: IUser['id'];
    friendId: IUser['id'];
}

export enum EWhereRemove {
    FRIENDS = 'friends',
    FOLLOW_FROM = 'followFrom',
    FOLLOW_TO = 'followTo',
}

export interface IRemoveFriend extends IAddFriend {
    whereRemove: EWhereRemove;
}
