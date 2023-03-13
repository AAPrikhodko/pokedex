import React from "react";
import styles from './Header.module.scss'
import textData from "../../languages/en.json"
import logo from '../../img/pokemonLogo.png'
import {useNavigate} from "react-router-dom";

const Header = () => {

    const pages = {
        search: "Search",
        favourites: "Favourites",
    }
    const navigate = useNavigate()
    const pageClickHandler = (pageKey: string) => navigate(`/${pageKey}`)

    return (
        <div className={styles.header_wrapper}>
            <nav className={styles.header_logo}>
                <img src={logo} alt="No logo"/>
            </nav>
            <div className={styles.header_page_block}>
                <h3 className={styles.header_caption}>{textData.header.caption}</h3>
                <div className={styles.header_line}/>
                <div className={styles.header_page_group}>
                    {
                        Object.keys(pages).map((pageKey: string) => {
                            return <div className={styles.header_page_group_title}
                                        onClick={() => pageClickHandler(pageKey)}
                            >
                                {pageKey}
                            </div>
                        })
                    }
                </div>
                <div/>
            </div>
        </div>
    )
}

export default Header