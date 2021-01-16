import { Convert, SearchResponse } from "../models/SearchResponse"
import Axios, { AxiosResponse } from "axios"
import { MFResponse } from "../models/SchemeDataResponse"

const baseUrl = 'https://api.mfapi.in'
const axios = Axios.create({baseURL: baseUrl})


class API{


    async searchScheme(searchString: string): Promise<AxiosResponse<SearchResponse[]>>{

       let response = await axios.get<SearchResponse[]>('/mf/search',{
            params: {
                q : searchString
            }
        })

        return response
    }

    async fetchSchemeData(schemeCode:string){

        let response = await axios.get<MFResponse>(`/mf/${schemeCode}`)
        return response

    }
  
}

export default new API()