import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BitcoinPage} from './bitcoin.page';
import {BitcoinListPage} from './bitcoin-list/bitcoin-list.page';
import {BitcoinDetailComponent} from './bitcoin-detail/bitcoin-detail.component';

const routes: Routes = [
    {
        path: '',
        component: BitcoinPage,
        children : [
            { path: '', redirectTo: 'coins', pathMatch: 'full' },
            {
                path: 'coins',
                component: BitcoinListPage
            },
            {
                path: 'coins/:id',
                component: BitcoinDetailComponent
            }
        ]
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BitcoinRoutingModule {
}
