import { Dayjs } from 'dayjs';

export interface IUser {
    id: string;
    name: string;
    email: string;
    birthday: Dayjs;
    avatar?: string;
    isActivated: boolean;
}
