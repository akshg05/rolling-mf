import { CSSProperties, useContext, useEffect, useRef, useState } from "react";

import API from '../api/mfApi'
import { SearchResponse } from "../models/SearchResponse";
import { SearchContextImproved } from "../providers/context_providers";
import { useOutsideAlerter } from "../utils/custom_hooks";
import { SelectedSchemeContext } from "../providers/selectedSchemeProvider";

const api = API

function SearchItem(props: {
    searchResponse: SearchResponse,
    setShowResults: any
}) {
    const itemStyle: CSSProperties = {
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        width: '290px',
        textAlign: 'start'
    }

    const [hovered, setHovered] = useState(false)
    const {selectedScheme, setSelectedScheme} = useContext(SelectedSchemeContext)

    const getBackground = () => hovered ? 'white' : 'wheat'

    const itemHolderStyle: CSSProperties = {
        width: 'auto',
        padding: '5px',
        alignItems: 'start',
        backgroundColor: getBackground()
    }

    return (

        <div className='flex-box flex-column'
            style={itemHolderStyle} onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={()=> {setSelectedScheme(props.searchResponse); props.setShowResults(false)}}>
            <div style={itemStyle}>
                {props.searchResponse.schemeName}
            </div>
            <div>
                Scheme Code : {props.searchResponse.schemeCode}
            </div>
        </div>
    )
}

export function SearchItemList() {
    const [schemeList, setSchemeList] = useState<SearchResponse[]>([])
    const [showResults, setShowResults] = useState(true)
    const { searchStr, setSearchStr } = useContext(SearchContextImproved)
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, setShowResults, !showResults);

    useEffect(() => {
        setShowResults(true)
        api.searchScheme(searchStr.searchString).then((response) => {
            if (response.status == 200)
                setSchemeList(response.data)
        })
    }, [searchStr])



    const listItems = schemeList.map((item) => <SearchItem searchResponse={item}
        setShowResults = {setShowResults}
        key={item.schemeCode} />)

    if (listItems.length > 0 && showResults)
        return (<div ref={wrapperRef} className="drop-list">
            <ul className='searchlist'>{listItems}</ul>
        </div>)
    else
        return <div></div>
}

export function SearchComponent() {

    const { searchStr, setSearchStr } = useContext(SearchContextImproved)

    return (

        <input className='inputClass' onChange={event => setSearchStr(event.target.value)} />


    )
}







