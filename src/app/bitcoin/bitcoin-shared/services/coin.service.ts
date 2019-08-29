import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RootObject} from '../models/coin.model';

@Injectable({
    providedIn: 'root'
})
export class CoinService {

    constructor(private http: HttpClient) {}

    fetchCoinsData(offset: number, limit: number) {
        return this.http.get<RootObject>(`https://api.coinranking.com/v1/public/coins?base=EUR&offset=${offset}&limit=${limit}`);
    }


}
