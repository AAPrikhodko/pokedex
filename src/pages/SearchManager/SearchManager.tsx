import React from 'react';
import textData from "./../../languages/en.json"
import {Actions, FilterTypes, TableColumns} from "../../utils/constants";
import {IPageSettings} from "../../models/models";
import FiltersTableLayoutWrapper from "../../components/FliltersTableLayout/FiltersTableLayoutWrapper";

const SearchManager = () => {

    const searchManagerSettings: IPageSettings = {
        filtersSettings: {
            title: textData.searchManager.filters.title,
            filters: [
                {
                    key: "name",
                    type: FilterTypes.Name,
                    placeholder: "filter by name"
                },
                {
                    key: "tag",
                    type: FilterTypes.Tag,
                    placeholder: "filter by type"
                }
            ]
        },
        tableSettings: {
            title: textData.searchManager.table.title,
            columns: [
                {title: textData.searchManager.table.columns.titles.avatar, dataIndex: TableColumns.Sprites},
                {title: textData.searchManager.table.columns.titles.name, dataIndex: TableColumns.Name},
                {title: textData.searchManager.table.columns.titles.types, dataIndex: TableColumns.Types},
                {title: textData.searchManager.table.columns.titles.stats, dataIndex: TableColumns.Stats},
                {title: textData.searchManager.table.columns.titles.actions, dataIndex: TableColumns.Actions},

            ],
            actionOptions: [Actions.Favourites, Actions.View]
        }
    }

    return (
        <FiltersTableLayoutWrapper
            pageSettings={searchManagerSettings}
        />
    );
};

export default SearchManager;