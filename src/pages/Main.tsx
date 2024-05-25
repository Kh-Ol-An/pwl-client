import React, { FC, useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hook';
import { getWishList } from '@/store/wishes/thunks';
import { selectUserId } from '@/store/selected-user/slice';
import Inactivated from '@/layouts/Inactivated';
import Header from '@/layouts/header/Header';
import Sidebar from '@/layouts/sidebar/Sidebar';
import WishList from '@/layouts/wish/WishList';

const Main: FC = () => {
    const myUser = useAppSelector((state) => state.myUser.user);

    const dispatch = useAppDispatch();

    const [showHeaderAndSidebar, setShowHeaderAndSidebar] = useState<boolean>(false);

    useEffect(() => {
        if (!myUser) return;

        const selectedUserId = localStorage.getItem('selectedUserId');
        if (selectedUserId) {
            dispatch(getWishList({ myId: myUser.id, userId: selectedUserId }));
            dispatch(selectUserId(selectedUserId));
        } else {
            dispatch(getWishList({ myId: myUser.id, userId: myUser.id }));
            dispatch(selectUserId(myUser.id));
        }
    }, []);

    return (
        <>
            {myUser?.isActivated ? (
                <>
                    <Header showHeader={showHeaderAndSidebar} hideHeader={() => setShowHeaderAndSidebar(false)} />

                    <div className="page main-page">
                        <button
                            className={"burger" + (showHeaderAndSidebar ? " open" : "")}
                            type="button"
                            onClick={() => setShowHeaderAndSidebar(prevState => !prevState)}
                        >
                            <div className="icon-left"></div>
                            <div className="icon-right"></div>
                        </button>

                        <Sidebar showSidebar={showHeaderAndSidebar} hideSidebar={() => setShowHeaderAndSidebar(false)} />

                        <div className="main-page-container">
                            <WishList />
                        </div>
                    </div>
                </>
            ) : <Inactivated />}
        </>
    );
};

export default Main;
