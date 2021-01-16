import { SearchResponse } from "./SearchResponse";

export interface SearchState{
    searchString : string
}

export interface SelectedSchemeState{
    selectedScheme: SearchResponse
}