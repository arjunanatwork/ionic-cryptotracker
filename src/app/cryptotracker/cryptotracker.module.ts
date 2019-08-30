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

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CryptotrackerRoutingModule,
        IonicStorageModule.forRoot()
    ],
    declarations: [CryptotrackerPage, CryptotrackerListPage, CryptotrackerDetailComponent, OnCreateChartDirective]
})
export class CryptotrackerPageModule {
}
