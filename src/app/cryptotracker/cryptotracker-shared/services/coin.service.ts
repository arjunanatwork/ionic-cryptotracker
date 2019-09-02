import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RootObject} from '../models/coin.model';
import {HistoryRootObject} from '../models/coin-history.model';
import {CurrencyRootObject} from '../models/currency.model';

@Injectable({
    providedIn: 'root'
})
export class CoinService {

    constructor(private http: HttpClient) {}

    fetchCoinsData(offset: number, limit: number, base: string, timePeriod: string) {
        return this.http.get<RootObject>(`https://hub.coinranking.com/v1/public/coins?base=${base}&offset=${offset}&limit=${limit}&timePeriod=${timePeriod}`);
    }

    fetchCoinsDataBySlug(slug: string, base: string) {
        return this.http.get<RootObject>(`https://hub.coinranking.com/v1/public/coins?slugs=${slug}&base=${base}`);
    }

    fetchCoinHistory(coindId: number, history: string, base: string) {
        return this.http.get<HistoryRootObject>(`https://hub.coinranking.com/v1/public/coin/${coindId}/history/${history}?base=${base}`);
    }

    fetchCurrencies(prefix: string, offset: number, limit: number) {
        return this.http.get<CurrencyRootObject>(`https://hub.coinranking.com/v1/public/currencies?limit=${limit}&offset=${offset}&prefix=${prefix}`);
    }

}
