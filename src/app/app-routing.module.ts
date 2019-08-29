import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'bitcoin',
        pathMatch: 'full'
    },
    {path: 'bitcoin', loadChildren: './bitcoin/bitcoin.module#BitcoinPageModule'},
    {path: 'currency', loadChildren: './currency/currency.module#CurrencyPageModule'}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
