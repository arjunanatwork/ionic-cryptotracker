import {Pipe, PipeTransform} from '@angular/core';

import * as numeral from 'numeral';


@Pipe({ name: 'numeral'})
export class NumeralPipe implements PipeTransform {
    transform(coinPrice: string) {
        return numeral(coinPrice).format( '0.00 a');
    }
}