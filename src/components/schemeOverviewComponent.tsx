import { useEffect, useState } from "react";
import mfApi from "../api/mfApi";

import { NavDatum, MFResponse, SchemeMeta } from "../models/SchemeDataResponse";

import { SearchResponse } from "../models/SearchResponse";
import { SelectedSchemeContext } from "../providers/selectedSchemeProvider";
import Utility from "../utils/utility";
import NavChart from "./navChart";

const api = mfApi

function SchemeMetaInfo(props: { meta: SchemeMeta }) {
    return (
        <div>
            <div style={{ color: 'gray', padding: '0px 8px' }}>{props.meta.scheme_category}</div>
            {/* <div>{props.meta.fund_house}</div> */}
        </div>
    )
}

function NavItem(props: { navData: NavDatum, prevNav: NavDatum }) {

    let changeP: number = 0
    if (props.prevNav != null)
        changeP = computeDiffPercent()

    function computeDiffPercent() {
        return ((parseFloat(props.navData.nav) - parseFloat(props.prevNav.nav)) / parseFloat(props.navData.nav) * 100)
    }

    function computeFixed(value: string) {
        return parseFloat(value).toFixed(2)
    }
    function computeColor(value: number) { return value > 0 ? 'green' : 'red' }
    return (
        <div className='flex-column font-small' style={{
            alignItems: 'flex-end',
            borderBottom: '1px solid grey',
        }}>
            <div >{Utility.parseSchemeDate(props.navData.date)}</div>
            <div className='flex-row font-medium' style={{width:'100%'}}>

                <div>₹{computeFixed(props.navData.nav)}</div>
                <div style={{ flexGrow: 1 }}></div>
                {props.prevNav ? <div style={{ width: '80px', textAlign: 'right', color: computeColor(changeP) }}>
                    {changeP.toFixed(2)}%
                </div> : null}
            </div>
        </div>
    )
}

function NavList(props: { navList: JSX.Element[] | undefined }) {
    return (<div style={{
        height: window.innerHeight,
        width: window.innerWidth,
        overflowY: 'scroll'
    }}>
        <ul style={{ padding: '0px 5px' }}>{props.navList}</ul>
    </div>)
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

        <div className='flex-box flex-column' style={{ alignItems: 'start', textAlign: 'start' }}>
            {schemeData ? <SchemeMetaInfo meta={schemeData.meta} /> : null}
            <div style={{ fontWeight: 'bold', fontSize: '16px', margin: '0px 8px' }}>{props.schemeItem.schemeName}</div>
            
            {schemeData ?
                <div>
                    <NavChart navData={schemeData?.data!}/>
                    <NavList navList={getListItems()} />
                </div>
                : null}
        </div>
    )

}

export function SchemeOverviewWrapper() {
    return (
        <SelectedSchemeContext.Consumer>
            {value => (<SchemeOverview schemeItem={value.selectedScheme} />)}
        </SelectedSchemeContext.Consumer>
    )
}
