import { Convert, Resource, SearchResponse } from "../models/ApiModels"
import Axios, { AxiosResponse } from "axios"

const baseUrl = 'https://api.mfapi.in'
const axios = Axios.create({baseURL: baseUrl})


export default class API{


    async searchScheme(searchString: string): Promise<AxiosResponse<SearchResponse[]>>{

       let response = await axios.get<SearchResponse[]>('/mf/search',{
            params: {
                q : searchString
            }
        })

        return response
    }
}