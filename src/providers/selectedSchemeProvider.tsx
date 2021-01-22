import React, { useMemo, useState } from "react";
import { useContext } from "react";
import { LoadingProps } from "../App";
import { SearchResponse } from "../models/SearchResponse";

export const SelectedSchemeContext = React.createContext(
    {
        selectedScheme: {} as SearchResponse,
        setSelectedScheme: (_value: SearchResponse) => { }
    }
)

export default function SelectedSchemeProvider(props:LoadingProps){

    const [selectedScheme, setSelectedScheme] = useState({} as SearchResponse)
    const selectedSchemeStore = useMemo(
        () => {
          console.log('computed new value')
          return { selectedScheme, setSelectedScheme }
        }, [selectedScheme]
      )

    return(
        <SelectedSchemeContext.Provider value={selectedSchemeStore}>
            {props.children}
        </SelectedSchemeContext.Provider>
    )

}

