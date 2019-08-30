import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RootObject} from '../models/coin.model';
import {HistoryRootObject} from '../models/coin-history.model';

@Injectable({
    providedIn: 'root'
})
export class CoinService {

    constructor(private http: HttpClient) {}

    fetchCoinsData(offset: number, limit: number) {
        return this.http.get<RootObject>(`https://api.coinranking.com/v1/public/coins?base=EUR&offset=${offset}&limit=${limit}`);
    }

    fetchCoinsDataBySlug(slug: string) {
        return this.http.get<RootObject>(`https://api.coinranking.com/v1/public/coins?slugs=${slug}&base=EUR`);
    }

    fetchCoinHistory(coindId: number) {
        return this.http.get<HistoryRootObject>(`https://api.coinranking.com/v1/public/coin/${coindId}/history/1y?base=EUR`);
    }

}
