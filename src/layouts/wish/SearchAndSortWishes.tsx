import React, { FC, useState } from 'react';
import Search from "@/components/Search";
import Popup from "@/components/Popup";
import { SwapVert as SwapVertIcon } from "@mui/icons-material";
import StylesVariables from "@/styles/utils/variables.module.scss";
import Button from "@/components/Button";
import { EWishSort } from "@/models/IWish";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { useTranslation } from "react-i18next";
import { setWishesSearch, setWishesSort } from "@/store/wishes/slice";
import { getAllWishes, getWishList } from "@/store/wishes/thunks";
import { WISHES_PAGINATION_LIMIT } from "@/utils/constants";

interface IProps {
    wishListRefCurrent: HTMLUListElement | null;
}

const SearchAndSortWishes: FC<IProps> = ({ wishListRefCurrent }) => {
    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const [ anchor, setAnchor ] = useState<HTMLButtonElement | null>(null);

    const wishes = useAppSelector((state) => state.wishes);
    const selectedUserId = useAppSelector((state) => state.selectedUser?.id);
    const myUser = useAppSelector((state) => state.myUser.user);

    let wishesSortText;
    wishes.sort === EWishSort.POPULAR && (wishesSortText = t('main-page.sort.by-popularity'));
    wishes.sort === EWishSort.PRICE_DESC && (wishesSortText = t('main-page.sort.by-price-down'));
    wishes.sort === EWishSort.PRICE_ASC && (wishesSortText = t('main-page.sort.by-price-up'));
    wishes.sort === EWishSort.CREATED_DESC && (wishesSortText = t('main-page.sort.by-created-up'));
    wishes.sort === EWishSort.CREATED_ASC && (wishesSortText = t('main-page.sort.by-created-down'));

    const handleChangeSearchBar = async (value: string) => {
        await dispatch(setWishesSearch(value));

        if (selectedUserId) {
            dispatch(getWishList({
                myId: myUser?.id,
                userId: selectedUserId,
                status: wishes.status,
                page: 1,
                limit: WISHES_PAGINATION_LIMIT,
                search: value,
                sort: wishes.sort,
            }));
        } else {
            dispatch(getAllWishes({
                page: 1,
                limit: WISHES_PAGINATION_LIMIT,
                search: value,
                sort: wishes.sort,
            }));
        }

        if (!wishListRefCurrent) return;

        wishListRefCurrent.scrollTo(0, 0);
    };

    const handleSortBy = async (value: EWishSort) => {
        await dispatch(setWishesSort(value));

        if (selectedUserId) {
            dispatch(getWishList({
                myId: myUser?.id,
                userId: selectedUserId,
                status: wishes.status,
                page: 1,
                limit: WISHES_PAGINATION_LIMIT,
                search: wishes.search,
                sort: value,
            }));
        } else {
            dispatch(getAllWishes({
                page: 1,
                limit: WISHES_PAGINATION_LIMIT,
                search: wishes.search,
                sort: value,
            }));
        }

        if (!wishListRefCurrent) return;

        wishListRefCurrent.scrollTo(0, 0);

        setAnchor(null);
    };

    return (
        <>
            <div className="search-and-sort-wishes">
                <div className="wish-search">
                    <Search
                        id="wish-search"
                        label={ t('main-page.wishes-search') }
                        value={ wishes.search }
                        changeSearchBar={ handleChangeSearchBar }
                    />
                </div>

                <Popup
                    anchor={ anchor }
                    setAnchor={ setAnchor }
                    actionIcon={
                        <>
                            <span className="sort-popup-action-text">
                                { wishesSortText }
                            </span>
                            <SwapVertIcon sx={ { color: StylesVariables.primaryColor } } />
                        </>
                    }
                >
                    <div className="sort-popup">
                        <Button variant="text" onClick={ () => handleSortBy(EWishSort.POPULAR) }>
                            { t('main-page.sort.by-popularity') }
                        </Button>

                        <Button variant="text" onClick={ () => handleSortBy(EWishSort.PRICE_DESC) }>
                            { t('main-page.sort.by-price-down') }
                        </Button>

                        <Button variant="text" onClick={ () => handleSortBy(EWishSort.PRICE_ASC) }>
                            { t('main-page.sort.by-price-up') }
                        </Button>

                        <Button variant="text" onClick={ () => handleSortBy(EWishSort.CREATED_DESC) }>
                            { t('main-page.sort.by-created-up') }
                        </Button>

                        <Button variant="text" onClick={ () => handleSortBy(EWishSort.CREATED_ASC) }>
                            { t('main-page.sort.by-created-down') }
                        </Button>
                    </div>
                </Popup>
            </div>
        </>
    );
};

export default SearchAndSortWishes;
