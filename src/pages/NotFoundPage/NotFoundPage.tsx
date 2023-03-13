import React from "react"
import styles from "../NotFoundPage/NotFoundPage.module.scss";
import textData from "../../languages/en.json"

const NotFoundPage = () => {
    return (
        <div className={styles.notFound_wrapper}>
            <div className={styles.notFound_description}>
                {textData.notFound.description}
            </div>
        </div>
    )
}

export default NotFoundPage