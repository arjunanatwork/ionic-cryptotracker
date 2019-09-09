import { ApplicationRef, Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { concat, interval } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable()
export class CheckForUpdateService {

    constructor(appRef: ApplicationRef, updates: SwUpdate) {
        // Allow the app to stabilize first, before starting polling for updates with `interval()`.
        if(updates.isEnabled) {
            const appIsStable$ = appRef.isStable.pipe(first(isStable => isStable === true));
            const interval$ = interval(6 * 60 * 60 );
            const intervalOnceAppIsStable$ = concat(appIsStable$, interval$);
            intervalOnceAppIsStable$.subscribe(() => updates.checkForUpdate());
        }
    }
}