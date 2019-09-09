import {Pipe, PipeTransform} from '@angular/core';

import * as numeral from 'numeral';


@Pipe({ name: 'numeralInt'})
export class NumeralIntegerPipe implements PipeTransform {
    transform(coinPrice: number) {
        return numeral(coinPrice).format( '0.00 a');
    }
}