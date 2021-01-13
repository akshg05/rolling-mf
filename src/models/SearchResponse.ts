import { MFResponse } from "./SchemeDataResponse";

export interface SearchResponse {
    schemeCode: number;
    schemeName: string;
}


// Converts JSON strings to/from your types
export class Convert {
    public static toSearchResponse(json: string): SearchResponse[] {
        return JSON.parse(json);
    }

    public static searchResponseToJson(value: SearchResponse[]): string {
        return JSON.stringify(value);
    }

    public static toMFResponse(json: string): MFResponse {
        return JSON.parse(json);
    }

    public static mFResponseToJson(value: MFResponse): string {
        return JSON.stringify(value);
    }
}