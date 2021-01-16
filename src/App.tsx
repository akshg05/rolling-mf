import React, { PropsWithChildren, ReactNode, useMemo, useReducer, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { SearchComponent, SearchItemList } from './components/searchComponent';
import { SearchResponse } from './models/SearchResponse';
import { SchemeOverview, SchemeOverviewWrapper } from './components/schemeOverviewComponent';
import { SearchState } from './models/StoreTypes';
import { render } from '@testing-library/react';
import { SearchContextImproved, SearchContextProvider } from './utils/context_providers';
import SelectedSchemeProvider from './utils/selectedSchemeProvider';

export type LoadingProps = {
  children: React.ReactNode
}

export const SearchContext = React.createContext({
  searchStr: {} as SearchState,
  setSearchStr: (_value: string) => { }
})

// export const SelectedSchemeContext = React.createContext({
//   selectedScheme: {} as SearchResponse,
//   setSelectedScheme: (_value: SearchResponse) => { }
// })

const searchState = {
  searchString: ''
}
function searchStringReducer(searchState: SearchState, action: string) {
  let state = {} as SearchState
  state.searchString = action
  return state
}

const TestContext = React.createContext(0)

function TestComponent() {
  return (
    <div>ABX</div>
  )
}

const TestComponentWrapper = (props: LoadingProps) => {
  return (
    <TestContext.Provider value={1}>
      {props.children}
    </TestContext.Provider>
  )
}

function App() {

  const [searchStr, setSearchStr] = useReducer(searchStringReducer, {} as SearchState)
  const [selectedScheme, setSelectedScheme] = useState({} as SearchResponse)
  // const searchStore = useMemo(
  //   () => ({ searchStr, setSearchStr }), [searchStr]
  // )
  // const selectedSchemeStore = useMemo(
  //   () => {
  //     console.log('computed new value')
  //     return { selectedScheme, setSelectedScheme }
  //   }, [selectedScheme]
  // )
  //  const value = { searchStr, setSearchStr }
  //  const schemeValue = { selectedScheme, setSelectedScheme }

  return (
    <div className="App">
      <SelectedSchemeProvider>
        <SearchContextProvider>

          <header className="App-header">
            <div className='auto-margin'>
              <SearchComponent />
              <SearchItemList />
            </div>
          </header>

        </SearchContextProvider>

        <SchemeOverviewWrapper />
      </SelectedSchemeProvider>
      <TestComponentWrapper>
        <TestComponent />
      </TestComponentWrapper>


    </div>
  );
}

export default App;
