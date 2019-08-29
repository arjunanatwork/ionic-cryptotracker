import { Component, OnInit } from '@angular/core';
import {CoinService} from './bitcoin-shared/services/coin.service';
import {RootObject} from './bitcoin-shared/models/coin.model';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'app-bitcoin',
  templateUrl: './bitcoin.page.html',
  styleUrls: ['./bitcoin.page.scss']
})
export class BitcoinPage implements OnInit {


  constructor(private coinService: CoinService) { }

  ngOnInit() {}


}
