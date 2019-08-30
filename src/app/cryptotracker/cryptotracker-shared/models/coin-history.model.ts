export interface History {
    price: string;
    timestamp: any;
}

export interface Data {
    change: number;
    history: History[];
}

export interface HistoryRootObject {
    status: string;
    data: Data;
}