export interface MFResponse {
    meta:   Meta;
    data:   Datum[];
    status: string;
}

export interface Datum {
    date: string;
    nav:  string;
}

export interface Meta {
    fund_house:      string;
    scheme_type:     string;
    scheme_category: string;
    scheme_code:     number;
    scheme_name:     string;
}

