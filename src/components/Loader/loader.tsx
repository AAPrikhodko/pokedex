import React from 'react';
import styles from "./loader.module.scss"
import textData from "../../languages/en.json"
import loader from "../../img/loader.png"

const Loader = () => {
    return (
        <div className={styles.wrapper}>
            <div>{textData.searchManager.table.loaderText}</div>
            <img src={loader}/>
        </div>
    );
};

export default Loader;