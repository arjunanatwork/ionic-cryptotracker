import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'cryptotracker',
        pathMatch: 'full'
    },
    {path: 'cryptotracker', loadChildren: './cryptotracker/cryptotracker.module#CryptotrackerPageModule'},
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
