import React, { FC, useState, useEffect } from 'react';
import { useAppSelector } from '@/store/hook';
import Inactivated from '@/layouts/Inactivated';
import Header from '@/layouts/header/Header';
import Sidebar from '@/layouts/sidebar/Sidebar';
import WishList from '@/layouts/wish/WishList';
import InstallAppInstruction from "@/layouts/InstallAppInstruction";

const Main: FC = () => {
    const myUser = useAppSelector((state) => state.myUser.user);

    const [ showHeaderAndSidebar, setShowHeaderAndSidebar ] = useState<boolean>(false);
    const [ screenWidth, setScreenWidth ] = useState<number>(window.innerWidth);

    const handleToggleHeaderAndSidebar = () => {
        setShowHeaderAndSidebar(prevState => !prevState);
    };

    const hideHeaderAndSidebar = () => {
        setShowHeaderAndSidebar(false);
    };

    useEffect(() => {
        const handlePopState = () => {
            if (showHeaderAndSidebar) {
                setShowHeaderAndSidebar(false);
            }
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [showHeaderAndSidebar]);

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
            <Header showHeader={ showHeaderAndSidebar } hideHeader={ hideHeaderAndSidebar } />

            <div className="page main-page">
                <button
                    className={ "burger" + (showHeaderAndSidebar ? " open" : "") }
                    type="button"
                    onClick={ handleToggleHeaderAndSidebar }
                >
                    <div className="icon-left"></div>
                    <div className="icon-right"></div>
                </button>

                <Sidebar showSidebar={ showHeaderAndSidebar } hideSidebar={ hideHeaderAndSidebar } />

                <div className="main-page-container">
                    <WishList />
                </div>
            </div>

            { myUser && (
                <>
                    { screenWidth < 1280 && !myUser?.showedInfo && (
                        <InstallAppInstruction />
                    ) }

                    { !myUser.isActivated && <Inactivated /> }
                </>
            ) }
        </>
    );
};

export default Main;
