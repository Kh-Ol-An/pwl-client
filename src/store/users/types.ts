import { IUser } from '@/models/IUser';

export interface IGetUser {
    page: number;
    limit: number;
    myUserId: IUser['id'];
    userType: 'all' | 'friends' | 'followFrom' | 'followTo';
    search: string;
}
