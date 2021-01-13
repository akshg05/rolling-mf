export interface SearchResponse {
    schemeCode: number;
    schemeName: string;
}

export interface Resource<T>{
    data: T
    status: number
    msg?: string
}

// Converts JSON strings to/from your types
export class Convert {
    public static toSearchResponse(json: string): SearchResponse[] {
        return JSON.parse(json);
    }

    public static searchResponseToJson(value: SearchResponse[]): string {
        return JSON.stringify(value);
    }
}