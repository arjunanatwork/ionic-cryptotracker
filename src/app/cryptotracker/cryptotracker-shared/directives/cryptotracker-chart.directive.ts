import {Directive, ElementRef, Input, OnInit} from '@angular/core';
import {Coin} from '../models/coin.model';
import { Chart } from 'sparkline.js';

@Directive({
    selector: '[onCreate]',
})
export class OnCreateChartDirective implements OnInit {

    @Input() coinData: Coin;

    constructor(private el: ElementRef) {}

    ngOnInit() {
        const historyValues = this.coinData.history;
        const line = new Chart.Line({ width: 60, height: 25 });
        const sparklineColor = this.coinData.change > 0 ? '#2ac27a' : '#ff6060';
        line.value(historyValues).render( this.el.nativeElement, { color: sparklineColor } );
    }

}



