import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {IPokemon, ITableState} from "../../models/models";

const initialState: ITableState = {
    table: {
        pokemons: [],
        favourites: []
    }
}

const tableSlice = createSlice({
    name: "table",
    initialState,
    reducers: {
        setPokemons(state, action: PayloadAction<IPokemon[]>) {
            state.table.pokemons = action.payload
        },

        addFavourite(state, action: PayloadAction<number>) {
            state.table.favourites.push(action.payload)
            state.table.pokemons.find(p => p.id === action.payload)!.isFavourite = true
        },

        removeFavourite(state, action: PayloadAction<number>) {
            state.table.favourites = state.table.favourites.filter(f => f !== action.payload)
            state.table.pokemons.find(p => p.id === action.payload)!.isFavourite = false
        }
    }
})

export const {setPokemons, addFavourite, removeFavourite} = tableSlice.actions

export default tableSlice.reducer