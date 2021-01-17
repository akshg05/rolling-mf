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

function App() {

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
          <SchemeOverviewWrapper />
        </SearchContextProvider>    
      </SelectedSchemeProvider>
    </div>
  );
}

export default App;
