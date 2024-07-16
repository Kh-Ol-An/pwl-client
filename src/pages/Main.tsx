import React, { FC, useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hook';
import { getWishList } from '@/store/wishes/thunks';
import { selectUserId } from '@/store/selected-user/slice';
import Inactivated from '@/layouts/Inactivated';
import Header from '@/layouts/header/Header';
import Sidebar from '@/layouts/sidebar/Sidebar';
import WishList from '@/layouts/wish/WishList';
import InstallAppInstruction from "@/layouts/InstallAppInstruction";

const Main: FC = () => {
    const myUser = useAppSelector((state) => state.myUser.user);

    const dispatch = useAppDispatch();

    const [ showHeaderAndSidebar, setShowHeaderAndSidebar ] = useState<boolean>(false);
    const [ screenWidth, setScreenWidth ] = useState<number>(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <>
            <Header showHeader={ showHeaderAndSidebar } hideHeader={ () => setShowHeaderAndSidebar(false) } />

            <div className="page main-page">
                <button
                    className={ "burger" + (showHeaderAndSidebar ? " open" : "") }
                    type="button"
                    onClick={ () => setShowHeaderAndSidebar(prevState => !prevState) }
                >
                    <div className="icon-left"></div>
                    <div className="icon-right"></div>
                </button>

                <Sidebar showSidebar={ showHeaderAndSidebar } hideSidebar={ () => setShowHeaderAndSidebar(false) } />

                <div className="main-page-container">
                    <WishList />
                </div>
            </div>

            { screenWidth < 1280 && !myUser?.showedInfo && (
                <InstallAppInstruction />
            ) }

            { myUser && !myUser.isActivated && <Inactivated /> }
        </>
    );
};

export default Main;
