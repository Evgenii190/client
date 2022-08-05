import React, { useState } from "react";
import styles from "../../styles/catalog.module.css";
import Checkbox from "../../components/Checkbox/Checkbox";
import Range from "../../components/Range/Range";
import classNames from "classnames";

const FilterItem = ({ filter, selectFiltersHandler }) => {
    const [isShow, setIsShow] = useState(true);

    return (
        <div className={styles.catalog__sidebar_item} key={filter.params}>
            <div
                className={classNames({
                    [styles.catalog__sidebar_title]: true,
                    [styles.catalog__sidebar_title__close]: !isShow,
                })}
                onClick={() => setIsShow(!isShow)}
            >
                {filter.params}
            </div>
            {isShow &&
                (filter.type === 1 ? (
                    filter.value.map((item) => {
                        return (
                            <Checkbox
                                key={item}
                                isChecked={false}
                                label={item}
                                selectFilter={selectFiltersHandler}
                                param={filter.params}
                            />
                        );
                    })
                ) : (
                    <Range
                        min={Math.min(...filter.value)}
                        max={Math.max(...filter.value)}
                    />
                ))}
        </div>
    );
};

export default FilterItem;
