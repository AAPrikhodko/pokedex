import React from 'react';
import TableLayout from "../../components/FliltersTableLayout/TableLayout";
import {useAppSelector} from "../../hooks/redux";
import textData from "../../languages/en.json";
import {Actions, TableColumns} from "../../utils/constants";
import {IPokemon} from "../../models/models";

const Favourites = () => {

    const tableSettings = {
        title: textData.searchManager.table.favourites,
        columns: [
            {title: textData.searchManager.table.columns.titles.avatar, dataIndex: TableColumns.Sprites},
            {title: textData.searchManager.table.columns.titles.name, dataIndex: TableColumns.Name},
            {title: textData.searchManager.table.columns.titles.types, dataIndex: TableColumns.Types},
            {title: textData.searchManager.table.columns.titles.stats, dataIndex: TableColumns.Stats},
            {title: textData.searchManager.table.columns.titles.actions, dataIndex: TableColumns.Actions},
        ],
        actionOptions: [Actions.View]
    }

    const pokemons = useAppSelector(state => state.searchManagerTable.table.pokemons)

    const getFavouritePokemons = (pokemons: IPokemon[]): IPokemon[] => {
        return pokemons.filter(p => p.isFavourite)
    }

    return (
        <TableLayout
            tableSettings={tableSettings}
            tableData={getFavouritePokemons(pokemons)}
            isDataLoaded={true}
        />
    );
}

export default Favourites;