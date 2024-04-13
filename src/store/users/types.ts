import { IUser } from '@/models/IUser';

export interface ISendUsersParams {
    page: number;
    limit: number;
    myUserId: IUser['id'];
    userType: 'all' | 'friends' | 'followFrom' | 'followTo';
    search: string;
}

export interface IGetUsers {
    followFromCount: number;
    users: IUser[];
}
