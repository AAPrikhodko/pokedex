import React, {useState} from 'react';
import {ITableSettings} from "../../models/models";
import {Card, Modal, Table, Tag} from "antd";
import styles from "./TableLayout.module.scss"
import {IPokemon, Sprites, Stat, Type} from "../../models/models";
import textData from "../../languages/en.json"
import {ColumnType} from "antd/es/table";
import {Actions, TableColumns} from "../../utils/constants";
import Loader from "../Loader/loader";
import {useDispatch} from "react-redux";
import {addFavourite, removeFavourite} from "../../store/searchManager/table.slice"
import {HeartOutlined, HeartFilled, EyeOutlined} from '@ant-design/icons';
import PokeCard from "../PokeCard/pokeCard";

type renderFunc = (record: IPokemon) => JSX.Element

interface ITableLayoutProps {
    tableSettings: ITableSettings
    tableData?: IPokemon[]
    isDataLoaded: boolean
}

interface IElements {
    [Actions.Favourites]: renderFunc,
    [Actions.View]: renderFunc
}

interface IAdditionalColumnSettings {
    transformValueToTitle?: (value: any) => any
}

interface ISetOfColumnsWithAdditionalSettings {
    [TableColumns.Avatar]?: IAdditionalColumnSettings,
    [TableColumns.Name]?: IAdditionalColumnSettings,
    [TableColumns.Height]?: IAdditionalColumnSettings,
    [TableColumns.Weight]?: IAdditionalColumnSettings,
    [TableColumns.Id]?: IAdditionalColumnSettings,
    [TableColumns.Types]?: IAdditionalColumnSettings
    [TableColumns.Stats]?: IAdditionalColumnSettings
    [TableColumns.Sprites]?: IAdditionalColumnSettings
}

const TableLayout = (props: ITableLayoutProps) => {

    const {tableSettings, tableData, isDataLoaded} = props
    const {columns, actionOptions, title} = tableSettings
    const [isModalOpenedWithPokemon, setIsModalOpenedWithPokemon] = useState<IPokemon | null>(null)
    const dispatch = useDispatch()

    const renderView = (record: IPokemon) => {
        return <EyeOutlined className={styles.eye} onClick={() => rowClickHandler(record)}/>
    }

    const renderFavourites = (record: IPokemon) => {
        return (
            record.isFavourite
                ?
                <HeartFilled
                    className={styles.heartFilled}
                    onClick={() => removeFavouriteHandler(record.id)}
                />
                :
                <HeartOutlined
                    className={styles.heart}
                    onClick={() => addFavouriteHandler(record.id)}
                />
        )
    }

    const elements: IElements = {
        [Actions.View]: renderView,
        [Actions.Favourites]: renderFavourites
    }

    const additionalColumnsSettings: ISetOfColumnsWithAdditionalSettings = {
        [TableColumns.Name]: {
            transformValueToTitle: (name: string) => {
                return <div className={styles.name}>{name.toUpperCase()}</div>
            }
        },
        [TableColumns.Sprites]: {
            transformValueToTitle: (sprites: Sprites) => {
                return <img
                    src={sprites.other.dream_world.front_default}
                    alt={textData.searchManager.table.noLogo}
                    className={styles.avatar}
                />
            }
        },
        [TableColumns.Stats]: {
            transformValueToTitle: (stats: Stat[]) => {
                return (
                    stats.map((stat: Stat) => {
                        return (
                            <div className={styles.stat}>
                                <span className={styles.label}>{stat.stat.name} </span>
                                <span className={styles.value}>{stat.base_stat}</span>
                            </div>
                        )
                    })
                )
            }
        },
        [TableColumns.Types]: {
            transformValueToTitle: (types: Type[]) => {
                return types.map((type: Type) => {
                    return (
                        <Tag className={styles.tag} color={"green"} key={type.type.name}>
                            {type.type.name.toUpperCase()}
                        </Tag>
                    )
                })
            }
        }
    }

    const renderCellsForColumn = (columnSettings: IAdditionalColumnSettings) => {
        const {transformValueToTitle} = columnSettings || {}
        return function (value: any) {
            return <span> {transformValueToTitle ? transformValueToTitle(value) : value} </span>
        }
    }

    const renderActionOptions = (actionOptions: Array<string>, record: IPokemon) => {
        return actionOptions.map((option) => {
            return (elements as any)[option](record)
        })
    }

    const rowClickHandler = (pokemon: IPokemon) => setIsModalOpenedWithPokemon(pokemon)
    const addFavouriteHandler = (pokemonId: number) => dispatch(addFavourite(pokemonId))
    const removeFavouriteHandler = (pokemonId: number) => dispatch(removeFavourite(pokemonId))

    const prepareColumns = (columns: Array<ColumnType<IPokemon>>): Array<ColumnType<IPokemon>> => {
        columns?.forEach(column => {
            column.key = String(column.dataIndex)
            if (!column.render) {
                column.render = (column.title !== textData.searchManager.table.columns.titles.actions)
                    ? renderCellsForColumn((additionalColumnsSettings as any)[column.key])
                    : (_, record) => {
                        return (
                            <div className={styles.actions}>
                                {
                                    renderActionOptions(actionOptions, record)
                                }
                            </div>
                        )
                    }
            }
        })
        return columns
    }

    return (
        <Card
            title={title}
            bordered={false}
            type="inner"
            className={styles.customCard}
        >
            {
                isDataLoaded
                    ? <>
                        <Table
                            pagination={{
                                position: ["bottomCenter"],
                                showSizeChanger: true,
                                pageSizeOptions: ["10", "20", "50"]
                            }}
                            className={styles.customTable}
                            columns={prepareColumns(columns)}
                            dataSource={tableData}
                            tableLayout={"fixed"}
                        />
                        {!!isModalOpenedWithPokemon &&
                            <Modal
                                className={styles.pokeModal}
                                open={!!isModalOpenedWithPokemon}
                                onCancel={() => setIsModalOpenedWithPokemon(null)}
                                footer={null}
                                centered
                            >
                                <PokeCard pokemon={isModalOpenedWithPokemon}/>
                            </Modal>
                        }
                    </>
                    : <Loader/>
            }
        </Card>
    );
};

export default TableLayout;