import React from "react";
import { useMemo, useReducer } from "react";
import { LoadingProps, SearchContext } from "../App";
import { SearchState } from "../models/StoreTypes";

export const SearchContextImproved = React.createContext({
    searchStr: {} as SearchState,
    setSearchStr: (_value: string) => { }
})

function searchStringReducer(searchState: SearchState, action: string) {
    let state = {} as SearchState
    state.searchString = action
    return state
}


export function SearchContextProvider(props:LoadingProps) {

    const [searchStr, setSearchStr] = useReducer(searchStringReducer, {} as SearchState)

    const searchStore = useMemo(
        () => ({ searchStr, setSearchStr }), [searchStr]
    )

    return(
        <SearchContextImproved.Provider value={searchStore}>
            {props.children}
        </SearchContextImproved.Provider>
    )
}


