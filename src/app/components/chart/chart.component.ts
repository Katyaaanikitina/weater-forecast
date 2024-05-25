import { Component } from '@angular/core';
import { SandboxService } from 'src/app/shared/services/forecast.service';
import Chart from 'chart.js/auto';
import { Subscription, switchMap } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { ForecastItem, TimesAndTemperatures } from 'src/app/shared/interfaces/forecast';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent {
  city!: string;
  chart!: Chart;
  subscription!: Subscription;

  constructor(private readonly _sandboxService: SandboxService,
              private readonly _route: ActivatedRoute) {}

  ngOnInit() {
    this.subscription = this._loadChartForCity();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private _drawChart(labels: string[], data: number[]): void {
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Temperature(C°)',
            data: data,
            borderWidth: 1,
            pointBackgroundColor: "#C7F6C7",
            pointBorderColor: "#155545",
            borderColor: "#155545",
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  private _getTimesAndTemperatures(list: ForecastItem[]): TimesAndTemperatures {
    const times: string[] = [];
    const temperatures: number[] = [];

    list.forEach((item: ForecastItem) => {
      times.push(item.dt_txt);
      temperatures.push(item.main.temp);
    })
    
    return { times, temperatures };
  }

  private _loadChartForCity(): Subscription {
    return this._route.params.pipe(
      switchMap((params: Params) => {
        return this._sandboxService.getFullForecast(params['city'])
      })

    ).subscribe((data) => {
      this.city = data.city.name;
      const timesAndTemperature = this._getTimesAndTemperatures(data.list); // todo
      this._drawChart(timesAndTemperature.times, timesAndTemperature.temperatures); // todo
    })
  }
}
