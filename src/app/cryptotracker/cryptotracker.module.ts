import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {CryptotrackerPage} from './cryptotracker.page';
import {CryptotrackerRoutingModule} from './cryptotracker-router.module';
import {CryptotrackerListPage} from './cryptotracker-list/cryptotracker-list.page';
import {IonicStorageModule} from '@ionic/storage';
import {OnCreateChartDirective} from './cryptotracker-shared/directives/cryptotracker-chart.directive';
import {CryptotrackerDetailComponent} from './cryptotracker-detail/cryptotracker-detail.component';
import {CryptotrackerDetailOverviewComponent} from './cryptotracker-detail/cryptotracker-detail-overview/cryptotracker-detail-overview.component';
import {CryptotrackerPreferenceComponent} from './cryptotracker-preference/cryptotracker-preference.component';
import {IonicSelectableModule} from 'ionic-selectable';
import {NumeralPipe} from './cryptotracker-shared/pipes/cryptotracker-numeral.pipe';
import {NumeralIntegerPipe} from './cryptotracker-shared/pipes/cryptotracker-numeral-integer.pipe';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CryptotrackerRoutingModule,
        IonicSelectableModule,
        IonicStorageModule.forRoot()
    ],
    entryComponents: [
        CryptotrackerPreferenceComponent
    ],
    declarations: [CryptotrackerPage, CryptotrackerListPage, CryptotrackerDetailComponent,
        CryptotrackerDetailOverviewComponent, CryptotrackerPreferenceComponent, OnCreateChartDirective, NumeralPipe, NumeralIntegerPipe]
})
export class CryptotrackerPageModule {
}
