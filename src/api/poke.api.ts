import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IPokemon, IPokemonShort, ITypesShort, ServerResponse} from "../models/models";

export const pokeApi = createApi({
    reducerPath: 'poke/api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://pokeapi.co/api/v2'
    }),
    endpoints: build => ({
        getPokemonsShort: build.query<Array<IPokemonShort>, void>({
            query: () => ({
                url: `/pokemon/`,
                params: {
                    limit: 500
                }
            }),
            transformResponse: (response: ServerResponse<IPokemonShort>) => response.results
        }),

        getPokemonsFull: build.query<IPokemon, string | number>({
            query: (nameOrId) => {
                return `/pokemon/${nameOrId}`
            },
        }),

        getTypesConfiguration: build.query<Array<string>, void>({
            query: () => ({
                url: `/type/`,
            }),
            transformResponse: (response: ServerResponse<ITypesShort>) => response.results.map(r => r.name)
        })
    })
})

export const {useGetPokemonsShortQuery, useGetPokemonsFullQuery, useGetTypesConfigurationQuery} = pokeApi