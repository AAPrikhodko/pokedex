import React, {useEffect, useState} from 'react';
import {IFilterState, IPageSettings} from "../../models/models";
import FiltersLayout from "./FiltersLayout";
import TableLayout from "./TableLayout";
import {useGetPokemonsShortQuery} from "../../api/poke.api";
import {IPokemon, IPokemonShort} from "../../models/models";
import {useAppSelector} from "../../hooks/redux";
import {useDispatch} from "react-redux";
import {setPokemons} from "../../store/searchManager/table.slice"

interface IFiltersTableLayoutWrapperProps {
    pageSettings: IPageSettings
}

const FiltersTableLayoutWrapper = (props: IFiltersTableLayoutWrapperProps) => {

    const {pageSettings} = props
    const {filtersSettings, tableSettings} = pageSettings

    const [isDataLoaded, setIsDataLoaded] = useState(true)
    const filters = useAppSelector((state) => state.searchManagerFilters)
    const pokemons = useAppSelector(state => state.searchManagerTable.table.pokemons)
    const {
        data,
        isSuccess,
        isLoading: isShortDataLoading
    } = useGetPokemonsShortQuery(undefined, {skip: !!pokemons.length})
    const dispatch = useDispatch()

    const getFullData = async (data: IPokemonShort[]) => {
        let result: IPokemon[] = [];
        let response = await Promise.all(data.map(p => fetch(p.url)))
        await Promise.all(response.map(item => item.json())).then((pokemons: IPokemon[]) => {
            pokemons.forEach((pokemon: IPokemon) => {
                result.push(pokemon)
            })
        })
        return result
    }

    const getFilteredPokemons = (pokemons: IPokemon[], filters: IFilterState): IPokemon[] => {
        let filteredByName = filters.name ? pokemons.filter((p) => p.name === filters.name) : pokemons
        return filters.types.length
            ? filteredByName.filter(p => {
                return p.types
                    .map(p => p.type.name.toLowerCase())
                    .some(pType => filters.types
                        .map(f => f.toLowerCase())
                        .includes(pType)
                    )
            })
            : filteredByName
    }

    useEffect(() => {
        isSuccess && data && data.length && getFullData(data).then(result => {
            setIsDataLoaded(true)
            return dispatch(setPokemons(result))
        })
    }, [isSuccess, data])

    useEffect(() => {
        if (isShortDataLoading) setIsDataLoaded(false)
    }, [isShortDataLoading])

    return (
        <>
            <FiltersLayout
                filtersSettings={filtersSettings}
                isDataLoaded={isDataLoaded}
            />
            <TableLayout
                tableSettings={tableSettings}
                tableData={getFilteredPokemons(pokemons, filters)}
                isDataLoaded={isDataLoaded}
            />
        </>
    );
};

export default FiltersTableLayoutWrapper;