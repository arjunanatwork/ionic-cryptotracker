import {ApplicationRef, Component, OnInit} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {SwUpdate} from '@angular/service-worker';
import {first} from 'rxjs/operators';
import {concat, interval} from 'rxjs';
import {CheckForUpdateService} from './cryptotracker/cryptotracker-shared/services/checkupdate.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private updates: SwUpdate,
        private checkForUpdateService: CheckForUpdateService
    ) {
        this.initializeApp();
        this.updates.available.subscribe((event) => {
            if (confirm('New version available. Load New Version?')) {
                window.location.reload();
            }
        });
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

}
