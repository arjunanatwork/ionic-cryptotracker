import {Component, OnInit} from '@angular/core';
import {CoinService} from '../cryptotracker-shared/services/coin.service';
import {Storage} from '@ionic/storage';
import {RootObject} from '../cryptotracker-shared/models/coin.model';
import {ActivatedRoute, Router} from '@angular/router';
import {PopoverController} from '@ionic/angular';
import {CryptotrackerPreferenceComponent} from '../cryptotracker-preference/cryptotracker-preference.component';
import {Currency} from '../cryptotracker-shared/models/currency.model';

@Component({
  selector: 'app-cryptotracker-list',
  templateUrl: './cryptotracker-list.page.html',
  styleUrls: ['./cryptotracker-list.page.scss']
})
export class CryptotrackerListPage implements OnInit {

  cryptoData: RootObject;
  baseCurrency: Currency;
  offset = 0;
  limit = 50;
  base = 'USD';

  constructor(private coinService: CoinService, private storage: Storage,
              private router: Router, private route: ActivatedRoute,
              private popoverController: PopoverController) {
  }

  ngOnInit() {
    this.fetchCoinsFetchData(this.offset, this.limit, this.base, null);
  }

  fetchCoinsFetchData(offset: number, limit: number, base: string, event) {
    this.coinService.fetchCoinsData(offset, limit, base).subscribe(res => {
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

  loadData(event, offset: number, limit: number, base: string) {
    setTimeout(() => {
      this.fetchCoinsFetchData(offset, limit, base, event);
      if (this.offset > this.cryptoData.data.stats.total) {
        event.target.disabled = true;
      }
    }, 500);
  }

  doRefresh(event) {
    // Reset Offset while refreshing
    this.cryptoData = undefined;
    this.fetchCoinsFetchData(0, 50, this.base, event);
  }

  navigateToCoinDetail(id: number, slug: string) {
    this.router.navigate(['cryptotracker/coins', id], {relativeTo: this.route.parent, state: { slug : slug, base: this.base}});
  }

  async preferencePopover(ev: any) {
      const popover = await this.popoverController.create({
        component: CryptotrackerPreferenceComponent,
        componentProps: { currency: this.baseCurrency },
        event: ev
      });

      popover.onDidDismiss().then((dataReturned) => {
        this.baseCurrency = dataReturned.data.currencyData as Currency;
        this.base = this.baseCurrency.symbol;
        this.cryptoData = undefined;
        this.fetchCoinsFetchData(0, 50, this.base, null);
      });

      return await popover.present();
  }
}
