import classNames from "classnames";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { Context, FiltersContext, SubTitleContext } from "../../../pages/_app";
import ShopService from "../../../services/ShopService";
import styles from "./TabItem.module.css";

const TabItem = ({ title, id, index, active, setActive }) => {
    const [itemsCategory, setItemsCategory] = useState([]);

    const context = useContext(Context);
    const subContext = useContext(SubTitleContext);
    // const [filterQuery, setFilterQuery] = useContext(FiltersContext);

    const setActiveTabHandler = async (e) => {
        setActive(index);
        if (index === active) {
            setActive(null);
            return;
        }
        const data = await ShopService.getItemsCategoriesById(id);
        setItemsCategory(data);
    };

    const setIdProductsBySubCategory = async (id, title) => {
        context[3](id);
        subContext[1](title);
    };

    return (
        <>
            <div
                className={classNames({
                    [styles.header__tab]: true,
                    [styles.header__tab__active]: index === active,
                })}
                onClick={setActiveTabHandler}
            >
                {title}
                <div
                    className={classNames({
                        [styles.header__tab_menu]: true,
                        [styles.header__tab_menu__active]: index === active,
                    })}
                >
                    <div className={styles.header__menu_inner}>
                        {itemsCategory.map(({ title, filters, id }, index) => {
                            return (
                                <div
                                    key={title + index}
                                    className={styles.header__menu_col}
                                >
                                    <Link href="/catalog">
                                        <a>
                                            <h5
                                                className={
                                                    styles.header__menu_title
                                                }
                                                onClick={() =>
                                                    setIdProductsBySubCategory(
                                                        id,
                                                        title
                                                    )
                                                }
                                            >
                                                {title}
                                            </h5>
                                        </a>
                                    </Link>
                                    {filters.map(({ value, params }) => {
                                        return (
                                            <p
                                                key={value + index}
                                                className={
                                                    styles.header__menu_text
                                                }
                                            >
                                                {value}
                                            </p>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default TabItem;
