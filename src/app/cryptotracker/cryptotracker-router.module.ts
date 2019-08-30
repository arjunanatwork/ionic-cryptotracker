import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CryptotrackerPage} from './cryptotracker.page';
import {CryptotrackerListPage} from './cryptotracker-list/cryptotracker-list.page';
import {CryptotrackerDetailComponent} from './cryptotracker-detail/cryptotracker-detail.component';

const routes: Routes = [
    {
        path: '',
        component: CryptotrackerPage,
        children : [
            { path: '', redirectTo: 'coins', pathMatch: 'full' },
            {
                path: 'coins',
                component: CryptotrackerListPage
            },
            {
                path: 'coins/:id',
                component: CryptotrackerDetailComponent
            }
        ]
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CryptotrackerRoutingModule {
}
