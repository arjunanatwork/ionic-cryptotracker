export interface Stats {
    total: number;
    offset: number;
    limit: number;
    order: string;
    base: string;
    totalMarkets: number;
    totalExchanges: number;
    totalMarketCap: number;
    total24hVolume: number;
}

export interface Base {
    symbol: string;
    sign: string;
}

export interface Social {
    name: string;
    url: string;
    type: string;
}

export interface AllTimeHigh {
    price: string;
    timestamp: number;
}

export interface Coin {
    id: number;
    uuid: string;
    slug: string;
    symbol: string;
    name: string;
    description: string;
    color: string;
    iconType: string;
    iconUrl: string;
    websiteUrl: string;
    socials: Social[];
    confirmedSupply: boolean;
    numberOfMarkets: number;
    numberOfExchanges: number;
    type: string;
    volume: number;
    marketCap: number;
    price: string;
    circulatingSupply: number;
    totalSupply: number;
    approvedSupply: boolean;
    firstSeen: number;
    change: number;
    rank: number;
    history: string[];
    allTimeHigh: AllTimeHigh;
    penalty: boolean;
}

export interface Data {
    stats: Stats;
    base: Base;
    coins: Coin[];
}

export interface RootObject {
    status: string;
    data: Data;
}
