import {configureStore} from '@reduxjs/toolkit'
import {setupListeners} from '@reduxjs/toolkit/query'
import {pokeApi} from "../api/poke.api";
import searchManagerFiltersReducer from "../store/searchManager/filters.slice"
import searchManagerTableReducer from "../store/searchManager/table.slice"

export const store = configureStore({
    reducer: {
        [pokeApi.reducerPath]: pokeApi.reducer,
        searchManagerFilters: searchManagerFiltersReducer,
        searchManagerTable: searchManagerTableReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(pokeApi.middleware)
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>