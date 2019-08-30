import {Component, OnInit} from '@angular/core';
import {CoinService} from '../cryptotracker-shared/services/coin.service';
import {Storage} from '@ionic/storage';
import {RootObject} from '../cryptotracker-shared/models/coin.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-cryptotracker-list',
  templateUrl: './cryptotracker-list.page.html',
  styleUrls: ['./cryptotracker-list.page.scss']
})
export class CryptotrackerListPage implements OnInit {

  cryptoData: RootObject;
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
      if (this.cryptoData !== undefined) {
        this.cryptoData.data.coins.push(...res.data.coins);
      } else {
        this.cryptoData = {...res};
      }
      // Complete events
      if(event !== null)
        event.target.complete();
    });
  }

  loadData(event, offset: number, limit: number) {
    setTimeout(() => {
      this.fetchCoinsFetchData(offset, limit, event);
      if(this.offset > this.cryptoData.data.stats.total) {
        event.target.disabled = true;
      }
    }, 500);
  }

  doRefresh(event) {
    // Reset Offset while refreshing
    this.fetchCoinsFetchData(0, 50, event);
  }

  navigateToCoinDetail(id: number, slug: string) {
    this.router.navigate(['cryptotracker/coins', id], {relativeTo: this.route.parent, state: { slug : slug}});
  }

}
