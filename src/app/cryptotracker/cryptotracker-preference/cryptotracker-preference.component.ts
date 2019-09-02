import {Component, OnInit} from '@angular/core';
import {Events, NavParams, PopoverController} from '@ionic/angular';
import {Currency, CurrencyRootObject} from '../cryptotracker-shared/models/currency.model';
import {IonicSelectableComponent} from 'ionic-selectable';
import {CoinService} from '../cryptotracker-shared/services/coin.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-cryptotracker-preference',
    templateUrl: './cryptotracker-preference.component.html',
    styleUrls: ['./cryptotracker-preference.component.scss'],
})
export class CryptotrackerPreferenceComponent implements OnInit {

    currencyRootObject: CurrencyRootObject;
    currencies: Currency[];
    currency: Currency;
    currencySubscription: Subscription;

    offset = 0;
    limit = 30;

    constructor(private coinService: CoinService, private popoverController: PopoverController, private navParams: NavParams) {
    }

    ngOnInit(): void {
        this.currency = this.navParams.get('currency');
    }

    searchPorts(event: { component: IonicSelectableComponent, text: string }) {
        const text = event.text.trim().toLowerCase();
        event.component.startSearch();

        if (this.currencySubscription) {
            this.currencySubscription.unsubscribe();
        }

        if (!text) {
            if (this.currencySubscription) {
                this.currencySubscription.unsubscribe();
            }
            this.coinService.fetchCurrencies('', 0, 30).subscribe(res => {
                this.currencyRootObject = {...res};
                event.component.items = res.data.currencies;
                event.component.endSearch();
                event.component.enableInfiniteScroll();
            });
            return;
        }

        this.currencySubscription = this.coinService.fetchCurrencies(text, 0, 30).subscribe(res => {
            if (this.currencySubscription.closed) {
                return;
            }
            event.component.items = res.data.currencies;
            event.component.endSearch();
        });
    }

    getMoreCurrency(event: { component: IonicSelectableComponent, text: string }) {
        const text = (event.text || '').trim().toLowerCase();

        if (this.offset > this.currencyRootObject.data.stats.total) {
            event.component.disableInfiniteScroll();
            return;
        }
        this.offset = this.offset + 30;
        this.coinService.fetchCurrencies(text, this.offset, this.limit).subscribe(res => {
            event.component.items = event.component.items.concat(res.data.currencies);
            event.component.endInfiniteScroll();
        });
    }

    currencySelected(event: { component: IonicSelectableComponent; value: any }) {
        this.popoverController.dismiss({currencyData: event.value}, 'closed');
    }

}
