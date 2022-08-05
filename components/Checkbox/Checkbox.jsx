import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import ShopService from "../../services/ShopService";
import styles from "./Checkbox.module.css";

const Checkbox = ({ label, isChecked, selectFilter, param }) => {
    const router = useRouter();
    const [checked, setChecked] = React.useState(isChecked);

    const changeCheckedHandler = (e) => {
        setChecked(!checked);
    };

    return (
        <label className={styles.container}>
            {label}
            <input
                type="checkbox"
                onChange={changeCheckedHandler}
                defaultChecked={checked}
                onClick={(e) => {
                    selectFilter(e, label, param, checked);
                    changeCheckedHandler();
                }}
            />
            <span className={styles.checkmark}></span>
        </label>
    );
};

export default Checkbox;
