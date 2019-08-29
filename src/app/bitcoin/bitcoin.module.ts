import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {BitcoinPage} from './bitcoin.page';
import {BitcoinRoutingModule} from './bitcoin-router.module';
import {BitcoinListPage} from './bitcoin-list/bitcoin-list.page';
import {IonicStorageModule} from '@ionic/storage';
import {OnCreateChartDirective} from './bitcoin-shared/directives/bitcoin-chart.directive';
import {BitcoinDetailComponent} from './bitcoin-detail/bitcoin-detail.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        BitcoinRoutingModule,
        IonicStorageModule.forRoot()
    ],
    declarations: [BitcoinPage, BitcoinListPage, BitcoinDetailComponent, OnCreateChartDirective]
})
export class BitcoinPageModule {
}
