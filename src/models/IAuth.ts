import { IUser } from '@/models/IUser';

export interface IAuth {
    accessToken: string;
    refreshToken: string;
    user: IUser;
}
