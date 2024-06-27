import { TCurrentAvatar, IUser } from '@/models/IUser';

export interface IForgotPassword {
    email: IUser['email'];
    lang: IUser['lang'];
}

export interface IChangeForgottenPassword {
    passwordResetLink: string;
    newPassword: string;
}

export interface ILogin {
    email: IUser['email'];
    password: string;
    lang: IUser['lang'];
}

export interface IGoogleAuth {
    email: IUser['email'];
    lang: IUser['lang'];
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
    birthday?: string;
    avatar: TCurrentAvatar;
}

export interface IChangeLang extends IUserId {
    lang: IUser['lang'];
}

export interface INotificationSubscription extends IUserId {
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

export interface IRemoveFriend extends IAddFriend {
    whereRemove: 'friends' | 'followFrom' | 'followTo';
}
