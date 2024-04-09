import { IUser } from '@/models/IUser';

export type userType = 'all' | 'friends' | 'followFrom' | 'followTo';

export interface IGetUser {
    page: number;
    limit: number;
    myUserId: IUser['id'];
    userType: userType;
    search: string;
}
