export interface Stats {
    total: number;
}

export interface Currency {
    id: number;
    type: string;
    symbol: string;
    name: string;
    iconUrl: string;
    sign: string;
}

export interface Data {
    stats: Stats;
    currencies: Currency[];
}

export interface CurrencyRootObject {
    status: string;
    data: Data;
}