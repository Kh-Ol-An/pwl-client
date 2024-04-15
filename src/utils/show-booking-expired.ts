import dayjs from 'dayjs';
import { IWish } from '@/models/IWish';
import { IUser } from '@/models/IUser';

export default (wish: IWish, myUserId: IUser['id'] | undefined): boolean => {
    // бажання заброньовано та належить користувачу та не виконано
    return !!wish.booking?.userId && myUserId === wish.userId && dayjs(wish.booking?.end).isSameOrBefore(dayjs());
};
