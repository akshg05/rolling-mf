import { CSSProperties, useContext, useEffect, useRef, useState } from "react";

import API from '../api/mfApi'
import { SearchContext } from "../App";
import { SearchResponse } from "../models/ApiModels";
import { useOutsideAlerter } from "../utils/custom_hooks";

const api = new API()

function SearchItem(props: SearchResponse) {
    const itemStyle:CSSProperties = {
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        width: '290px',
        textAlign:'start'
    }
    return (

        <div className='flex-box flex-column' style={{ width: 'auto', padding:'5px', alignItems: 'start' }}>
            <div style={itemStyle}>
                {props.schemeName}
            </div>
            <div>
                Scheme Code : {props.schemeCode}
            </div>
        </div>
    )
}

export function SearchItemList() {
    const [schemeList, setSchemeList] = useState<SearchResponse[]>([])
    const [showResults, setShowResults] = useState(true)
    const { searchStr, setSearchStr } = useContext(SearchContext)
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, setShowResults, !showResults);

    useEffect(() => {
        setShowResults(true)
        api.searchScheme(searchStr).then((response) => {
            if (response.status == 200)
                setSchemeList(response.data)
        })
    }, [searchStr])



    const listItems = schemeList.map((item) => <SearchItem schemeCode={item.schemeCode}
        schemeName={item.schemeName}
        key={item.schemeCode} />)

    if (listItems.length > 0 && showResults)
        return (<div ref={wrapperRef} className="drop-list">
            <ul className='searchlist'>{listItems}</ul>
        </div>)
    else
        return <div></div>
}

export function SearchComponent() {

    const { searchStr, setSearchStr } = useContext(SearchContext)

    return (

        <input className='inputClass' onChange={event => setSearchStr(event.target.value)} />


    )
}





