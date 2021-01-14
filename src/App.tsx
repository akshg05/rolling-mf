import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { SearchComponent, SearchItemList } from './components/searchComponent';
import { SearchResponse } from './models/SearchResponse';

export const SearchContext = React.createContext({
  searchStr: '',
  selectedScheme: {} as SearchResponse,
  setSearchStr: (_value: string) => { }
})

function App() {

  const [searchStr, setSearchStr] = useState('')
  const value = { searchStr, selectedScheme : {} as SearchResponse, setSearchStr }
  return (
    <div className="App">
      <SearchContext.Provider value={value}>
        <header className="App-header">
          <div className='auto-margin'>
            <SearchComponent />
            <SearchItemList />
          </div>

        </header>

      </SearchContext.Provider>

    </div>
  );
}

export default App;
