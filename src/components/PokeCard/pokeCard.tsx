import React from 'react';
import styles from './pokeCard.module.scss'
import {IPokemon} from "../../models/models";
import textData from "../../languages/en.json"
import {Card, Tag} from "antd";
import Meta from "antd/es/card/Meta";

interface IPokeProps {
    pokemon: IPokemon
}

const PokeCard = (props: IPokeProps) => {

    const {pokemon} = props

    return (
        <Card
            cover={
                <img
                    src={pokemon.sprites.other.dream_world.front_default}
                    alt={textData.searchManager.table.noLogo}
                />
            }
            className={styles.pokeCard}
        >
            <Meta
                className={styles.meta}
                title={pokemon.name}
                description={
                    <>
                        <div className={styles.descriptionItem}>
                            <span className={styles.label}>{textData.pokeCard.weight} </span>
                            <span className={styles.value}>{pokemon.weight}</span>
                        </div>
                        <div className={styles.descriptionItem}>
                            <span className={styles.label}>{textData.pokeCard.height} </span>
                            <span className={styles.value}>{pokemon.height}</span>
                        </div>
                        {
                            pokemon.stats.map((p) => {
                                return (
                                    <div className={styles.descriptionItem}>
                                        <span className={styles.label}>{p.stat.name} </span>
                                        <span className={styles.value}>{p.base_stat}</span>
                                    </div>
                                )
                            })
                        }
                        <div className={styles.descriptionItem}>
                            {
                                pokemon.types.map((p) => {
                                    return (
                                        <Tag className={styles.tag} color={"green"} key={p.type.name}>
                                            {p.type.name.toUpperCase()}
                                        </Tag>
                                    )
                                })
                            }
                        </div>

                    </>
                }/>
        </Card>
    );
};

export default PokeCard;