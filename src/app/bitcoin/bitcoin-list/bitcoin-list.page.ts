import {Component, OnInit} from '@angular/core';
import {CoinService} from '../bitcoin-shared/services/coin.service';
import {Storage} from '@ionic/storage';
import {RootObject} from '../bitcoin-shared/models/coin.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-bitcoin-list',
  templateUrl: './bitcoin-list.page.html',
  styleUrls: ['./bitcoin-list.page.scss']
})
export class BitcoinListPage implements OnInit {

  bitcoinData: RootObject;
  offset = 0;
  limit = 50;

  constructor(private coinService: CoinService, private storage: Storage, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.fetchCoinsFetchData(this.offset, this.limit, null);
  }

  fetchCoinsFetchData(offset: number, limit: number, event) {
    this.coinService.fetchCoinsData(offset, limit).subscribe(res => {
      this.offset = offset;
      this.limit = limit;
      if (this.bitcoinData !== undefined) {
        this.bitcoinData.data.coins.push(...res.data.coins);
      } else {
        this.bitcoinData = {...res};
      }
      // Complete events
      if(event !== null)
        event.target.complete();
    });
  }

  loadData(event, offset: number, limit: number) {
    setTimeout(() => {
      this.fetchCoinsFetchData(offset, limit, event);
      if(this.offset > this.bitcoinData.data.stats.total) {
        event.target.disabled = true;
      }
    }, 500);
  }

  doRefresh(event) {
    // Reset Offset while refreshing
    this.fetchCoinsFetchData(0, 50, event);
  }

  navigateToCoinDetail(id: number) {
    this.router.navigate(['bitcoin/coins', id], {relativeTo: this.route.parent});
  }

}
