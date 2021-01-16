import { useEffect, useState } from "react";
import mfApi from "../api/mfApi";
import { SelectedSchemeContext } from "../App";
import { Datum, MFResponse, SchemeMeta } from "../models/SchemeDataResponse";

import { SearchResponse } from "../models/SearchResponse";

const api = mfApi

function SchemeMetaInfo(props: { meta: SchemeMeta }) {
    return (
        <div>
            <div>{props.meta.scheme_category}</div>
            <div>{props.meta.fund_house}</div>
        </div>
    )
}

function NavItem(props: { navData: Datum, prevNav: Datum }) {

    function computeDiffPercent(){
        return (props.navData.nav - props.prevNav.nav)/props.navData.nav*100
    }
    return (
        <div className='flex-row'>
            <div>{props.navData.date}</div>
            <div style={{ width: '20px' }}></div>
            <div>{props.navData.nav}</div>
            {props.prevNav? computeDiffPercent: null}
        </div>
    )
}

export function SchemeOverview(props: {
    schemeItem: SearchResponse,
}) {

    const [schemeData, setSchemeData] = useState<MFResponse>()
    useEffect(() => {
        if (props.schemeItem.schemeCode == null)
            return
        api.fetchSchemeData(props.schemeItem.schemeCode.toString()).
            then((resp) => {
                if (resp.status == 200) {
                    setSchemeData(resp.data)
                }
            })
    }, [props.schemeItem])

    function getListItems() {
        const navItems = schemeData?.data.map((item, index, array) => <NavItem
            navData={item} prevNav={array[index + 1]} key={item.date} />)
        return navItems
    }

    return (

        <div className='flex-box flex-column' style={{ alignItems: 'start' }}>
            <div style={{ fontWeight: 'bold', fontSize: '16px' }}>{props.schemeItem.schemeName}</div>
            {schemeData ? <SchemeMetaInfo meta={schemeData.meta} /> : null}
            {schemeData ? <ul>{getListItems()}</ul> : null}
        </div>
    )

}

export function SchemeOverviewWrapper(){
    return(
        <SelectedSchemeContext.Consumer>
            {value=>(<SchemeOverview schemeItem={value.selectedScheme}/>)}
        </SelectedSchemeContext.Consumer>
    )
}
