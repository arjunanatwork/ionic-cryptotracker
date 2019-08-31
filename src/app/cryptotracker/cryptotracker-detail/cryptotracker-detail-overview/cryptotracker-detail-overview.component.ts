import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CoinService} from '../../cryptotracker-shared/services/coin.service';
import {Chart} from 'chart.js';
import {RootObject} from '../../cryptotracker-shared/models/coin.model';
import {DatePipe} from '@angular/common';

@Component({
    selector: 'app-cryptotracker-detail-overview',
    templateUrl: './cryptotracker-detail-overview.component.html',
    styleUrls: ['./cryptotracker-detail-overview.component.scss'],
    providers: [DatePipe]
})
export class CryptotrackerDetailOverviewComponent implements OnInit {

    cryptoData: RootObject;
    coinId: number;
    chart: any;
    // History value for chart
    history: string;
    // Sign for the chart tooltip
    sign: string;
    // Index for identifying the chips
    activeIndex: number;

    @Input() slug: string;


    constructor(private coinService: CoinService, private router: Router, private route: ActivatedRoute, private datepipe: DatePipe) {
    }

    ngOnInit() {
        this.coinId = +this.route.snapshot.paramMap.get('id');
        this.fetchCoinData(this.slug);
        this.changeHistory(3, '1y');
    }

    /**
     * Fetch the Coin Details based on slug
     * @param slug Slug name of the coin
     */
    fetchCoinData(slug: string) {
        this.coinService.fetchCoinsDataBySlug(slug).subscribe(res => {
            this.cryptoData = {...res};
            this.sign = this.cryptoData.data.base.sign;
        });
    }

    /**
     *  Called when user clicks on the chips
     * @param i index of the chip
     * @param history value of the chip
     */
    changeHistory(i: number, history: string) {
        this.activeIndex = i;
        this.history = history;
        this.fetchCoinHistory(this.coinId, history);
    }

    /**
     * Fetch the coin information based on history
     * @param coinId Id of the Coin
     * @param history History value
     */
    fetchCoinHistory(coinId: number, history: string) {
        this.coinService.fetchCoinHistory(this.coinId, history).subscribe(res => {
            const chartOptions = this.getChartTimeOptions(history);
            if (this.chart === undefined) {
                this.drawChart(res, history, chartOptions);
            } else {
                this.chart.data.datasets[0].data = res.data.history.map(e => {
                    return {t: e.timestamp, y: e.price};
                });
                this.chart.options.scales.xAxes[0].time.unit = chartOptions.unit;
                this.chart.options.scales.xAxes[0].time.unitStepSize = chartOptions.unitStepSize;
                this.chart.update();
            }
        });
    }

    /**
     * To draw the Chart
     * @param response Response from the API
     * @param history history value
     * @param chartOptions ChartOptions which has unit and unitStepSize, used for Chart.js Time OPtion
     */
    drawChart(response, history, chartOptions) {
        this.chart = new Chart(document.getElementById('chart'), {
            type: 'line',
            responsive: !0,
            maintainAspectRatio: !1,
            data: {
                datasets: [{
                    label: 'Bitcoin Price Chart',
                    borderColor: '#5a8cc0',
                    data: response.data.history.map(e => {
                        return {t: e.timestamp, y: e.price};
                    }),
                    type: 'line',
                    pointRadius: 0,
                    fill: false,
                    lineTension: 0,
                    borderWidth: 2
                }]
            },
            options: {
                scales: {
                    xAxes: [{
                        type: 'time',
                        distribution: 'series',
                        time: {
                            unit: chartOptions.unit,
                            unitStepSize: chartOptions.unitStepSize,
                            displayFormats: {
                                minute: 'HH:mm',
                                hour: 'HH:mm',
                                day: 'MMM D',
                                month: 'MMM YYYY',
                            }
                        },
                        gridLines: {
                            display: false
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            display: false
                        },
                        gridLines: {
                            drawBorder: false,
                            display: false
                        }
                    }]
                }, tooltips: {
                    intersect: false,
                    axis: 'x',
                    callbacks: {
                        title: (tooltipItem, myData) => {
                            return 'Price';
                        },
                        label: (tooltipItem, myData) => {
                            if (this.history === '1y' || this.history === '5y') {
                                tooltipItem.xLabel = this.datepipe.transform(tooltipItem.xLabel, 'dd MMM, yyy');
                            } else if (this.history === '30d' || this.history === '7d' || this.history === '24h') {
                                tooltipItem.xLabel = this.datepipe.transform(tooltipItem.xLabel, 'dd MMM H:mm');
                            }
                            const label = tooltipItem.xLabel + ' ' + this.sign + parseFloat(tooltipItem.yLabel).toFixed(2);
                            return label;
                        }
                    }
                },
                legend: {
                    display: false
                }
            }
        });
        this.initChartTooltipLine();
    }

    /**
     * Drawing a vertical when user hovers on an data point
     */
    initChartTooltipLine() {
        Chart.plugins.register({
            afterDatasetsDraw: (chart) => {
                if (chart.tooltip._active && chart.tooltip._active.length) {
                    const activePoint = chart.tooltip._active[0],
                        ctx = chart.ctx,
                        yaxis = chart.scales['y-axis-0'],
                        x = activePoint.tooltipPosition().x,
                        topY = yaxis.top,
                        bottomY = yaxis.bottom;
                    // draw line
                    ctx.save();
                    ctx.beginPath();
                    ctx.moveTo(x, topY);
                    ctx.lineTo(x, bottomY);
                    ctx.lineWidth = 2;
                    ctx.strokeStyle = '#5a8cc0';
                    ctx.stroke();
                    ctx.restore();
                }
            }
        });

    }

    private getChartTimeOptions(history: string) {
        switch (history) {
            case '24h':
                return {unit: 'hour', unitStepSize: 1};
                break;
            case '7d':
                return {unit: 'day', unitStepSize: 1};
                break;
            case '30d':
                return {unit: 'day', unitStepSize: 2};
                break;
            case '1y':
                return {unit: 'month', unitStepSize: 1};
                break;
            case '5y':
                return {unit: 'month', unitStepSize: 3};
                break;
        }
    }
}
