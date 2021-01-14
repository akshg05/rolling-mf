import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { SearchComponent, SearchItemList } from './components/searchComponent';
import { SearchResponse } from './models/SearchResponse';

export const SearchContext = React.createContext({
  searchStr: '',
  setSearchStr: (_value: string) => { }
})

export const SelectedSchemeContext = React.createContext({
  selectedScheme: {} as SearchResponse,
  setSelectedScheme: (_value: SearchResponse) => { }
})

function App() {

  const [searchStr, setSearchStr] = useState('')
  const [selectedScheme, setSelectedScheme] = useState({} as SearchResponse)
  const value = { searchStr, setSearchStr }
  const schemeValue = { selectedScheme, setSelectedScheme }
  return (
    <div className="App">
      <SearchContext.Provider value={value}>
        <SelectedSchemeContext.Provider value={schemeValue}>
          <header className="App-header">
            <div className='auto-margin'>
              <SearchComponent />
              <SearchItemList />
            </div>

          </header>
        </SelectedSchemeContext.Provider>
      </SearchContext.Provider>
      <SelectedSchemeContext.Provider value={schemeValue}>
        <SelectedSchemeContext.Consumer>
          {schemeValue => (<div>{schemeValue.selectedScheme.schemeName}</div>)}
        </SelectedSchemeContext.Consumer>
      </SelectedSchemeContext.Provider>

    </div>
  );
}

export default App;
