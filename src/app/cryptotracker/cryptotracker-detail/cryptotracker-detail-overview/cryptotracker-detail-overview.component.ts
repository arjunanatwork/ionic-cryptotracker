import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CoinService} from '../../cryptotracker-shared/services/coin.service';
import {Chart} from 'chart.js';
import {RootObject} from '../../cryptotracker-shared/models/coin.model';

@Component({
    selector: 'app-cryptotracker-detail-overview',
    templateUrl: './cryptotracker-detail-overview.component.html',
    styleUrls: ['./cryptotracker-detail-overview.component.scss'],
})
export class CryptotrackerDetailOverviewComponent implements OnInit {

    cryptoData: RootObject;
    coinId: number;
    @Input() slug: string;
    chart: any;

    constructor(private coinService: CoinService, private router: Router, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.coinId = +this.route.snapshot.paramMap.get('id');
        this.fetchCoinData(this.slug);
        this.fetchCoinHistory(this.coinId);
    }

    fetchCoinData(slug: string) {
        this.coinService.fetchCoinsDataBySlug(slug).subscribe(res => {
            console.log(res);
           this.cryptoData = { ...res };
        });
    }

    fetchCoinHistory(coinId: number) {
        this.coinService.fetchCoinHistory(this.coinId).subscribe(res => {
            this.chart = new Chart(document.getElementById('chart'), {
                type: 'line',
                responsive: !0,
                maintainAspectRatio: !1,
                data: {
                    datasets: [{
                      label: 'Bitcoin Price Chart',
                      borderColor: '#5a8cc0',
                      data: res.data.history.map(e => {
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
                                format: 'MMM',
                                unit: 'month',
                                unitStepSize: 3,
                                displayFormats: {
                                    minute: 'HH:mm',
                                    hour: 'HH:mm',
                                    day: 'MMM D',
                                    month: 'MMM '
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
                                const label = parseFloat(tooltipItem.yLabel).toFixed(2);
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

        });
    }

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

}
