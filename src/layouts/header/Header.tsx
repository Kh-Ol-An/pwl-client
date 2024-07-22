import React, { FC } from 'react';
import { handleGetInitialAllWishes } from "@/utils/action-on-wishes";
import HeaderSettings from "@/layouts/header/HeaderSettings";
import { useAppDispatch } from "@/store/hook";

interface IProps {
    showHeader: boolean;
    hideHeader: () => void;
}

const Header: FC<IProps> = ({ showHeader, hideHeader }) => {
    const dispatch = useAppDispatch();

    return (
        <div className={ "header" + (showHeader ? " show" : "") }>
            <div className="header-inner">
                <div className="header-content">
                    <button className="logo" type="button" onClick={ () => handleGetInitialAllWishes(dispatch) }>
                        <span className="logo-name">Wish Hub</span>
                    </button>

                    {/* Settings */ }
                    <HeaderSettings hideHeader={hideHeader} />
                </div>
            </div>
        </div>
    );
};

export default Header;
