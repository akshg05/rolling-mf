import React, { useMemo, useReducer, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { SearchComponent, SearchItemList } from './components/searchComponent';
import { SearchResponse } from './models/SearchResponse';
import { SchemeOverview } from './components/schemeOverviewComponent';
import { SearchState } from './models/StoreTypes';

export const SearchContext = React.createContext({
  searchStr: {} as SearchState,
  setSearchStr: (_value: string) => { }
})

export const SelectedSchemeContext = React.createContext({
  selectedScheme: {} as SearchResponse,
  setSelectedScheme: (_value: SearchResponse) => { }
})

const searchState = {
  searchString : ''
}
function searchStringReducer(searchState: SearchState, action:string){
  let state = {} as SearchState
  state.searchString = action
 return state
}

function App() {

  const [searchStr, setSearchStr] = useReducer(searchStringReducer, {} as SearchState)
  const [selectedScheme, setSelectedScheme] = useState({} as SearchResponse)
  const searchStore = useMemo(
    ()=>({searchStr, setSearchStr}),[searchStr]
  )
  const selectedSchemeStore = useMemo(
    ()=>{
      console.log('computed new value')
      return {selectedScheme, setSelectedScheme}}, [selectedScheme]
  )
   const value = { searchStr, setSearchStr }
   const schemeValue = { selectedScheme, setSelectedScheme }
  return (
    <div className="App">
      <SearchContext.Provider value={searchStore}>
        <SelectedSchemeContext.Provider value={selectedSchemeStore}>
          <header className="App-header">
            <div className='auto-margin'>
              <SearchComponent />
              <SearchItemList />
            </div>
          </header>
        </SelectedSchemeContext.Provider>
      </SearchContext.Provider>
      <SelectedSchemeContext.Provider value={selectedSchemeStore}>
        <SelectedSchemeContext.Consumer>
          {schemeValue => (<SchemeOverview schemeItem={schemeValue.selectedScheme}/>)}
        </SelectedSchemeContext.Consumer>
      </SelectedSchemeContext.Provider>

    </div>
  );
}

export default App;
