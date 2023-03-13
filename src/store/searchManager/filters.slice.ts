import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {IFilterState} from "../../models/models";

const initialState: IFilterState = {
    name: '',
    types: []
}

const filtersSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        setName(state, action: PayloadAction<string>) {
            state.name = action.payload
        },
        setTypes(state, action: PayloadAction<string[]>) {
            state.types = action.payload
        }
    }
})

export const {setName, setTypes} = filtersSlice.actions

export default filtersSlice.reducer