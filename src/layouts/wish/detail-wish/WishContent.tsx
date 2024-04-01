import React, { FC } from 'react';
import { addingWhiteSpaces } from '@/utils/formating-value';
import { IWish } from '@/models/IWish';
import { IUser } from '@/models/IUser';
//import { useAppSelector } from '@/store/hook';

interface IProps {
    wish: IWish;
    myUserId?: IUser['id'];
}

const WishContent: FC<IProps> = ({ wish, myUserId }) => {
    let show = <>Ваше бажання бачать <span className="accent">всі</span> користувачі.</>;
    wish.show === 'friends' && (show = <>Ваше бажання бачать тільки <span className="accent">друзі</span>.</>);
    wish.show === 'nobody' && (show = <>Ваше бажання <span className="accent">ніхто</span> не баче.</>);

    let showRow = false;
    myUserId === wish.userId && (showRow = true);
    wish.price && (showRow = true);

    const isURL = (str: string) => {
        try {
            new URL(str);
            return true;
        } catch {
            return false;
        }
    };
//    const users = useAppSelector((state) => state.users.list.find((user) => user.id === wish.booking?.userId));

    return (
        <>
            <div className="detail-wish-name">
                {wish.name}
            </div>
            {/*<div className="detail-wish-name">*/}
            {/*    {users?.firstName} {users?.lastName}*/}
            {/*</div>*/}

            {showRow && (
                <div className="detail-wish-row">
                    {myUserId === wish.userId && (
                        <p className="detail-wish-label">{show}</p>
                    )}

                    {wish.price && (
                        <div className="detail-wish-box">
                            <span className="detail-wish-label">Ціна:</span>
                            <span className="detail-wish-data">
                                {addingWhiteSpaces(wish.price)} грн.
                            </span>
                        </div>
                    )}
                </div>
            )}

            {wish.address && (
                <p className="detail-wish-description">
                    <span className="label">Де можна придбати:</span>
                    {isURL(wish.address) ? (
                        <a
                            className="link"
                            href={wish.address}
                            title={wish.address}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {wish.address}
                        </a>
                    ) : (<>{wish.address}</>)}
                </p>
            )}

            {wish.description && (
                <p className="detail-wish-description">
                    <span className="label">Опис:</span>
                    {wish.description}
                </p>
            )}
        </>
    );
};

export default WishContent;
