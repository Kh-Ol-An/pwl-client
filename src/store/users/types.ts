import { IUser } from '@/models/IUser';

export interface ISendAllUsersParams {
    page: number;
    limit: number;
    search: string;
}

export interface ISendUsersParams extends  ISendAllUsersParams {
    myUserId: IUser['id'];
    userType: 'all' | 'friends' | 'followFrom' | 'followTo';
}

export interface IGetUsers {
    followFromCount: number;
    users: IUser[];
}
