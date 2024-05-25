import { Component } from '@angular/core';
import { SandboxService } from 'src/app/entity/sandbox.service';
import Chart from 'chart.js/auto';
import { switchMap } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { ForecastItem, TimesAndTemperatures } from 'src/app/entity/interfaces';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent {
  city!: string;
  chart!: Chart;

  constructor(private readonly _sandboxService: SandboxService,
              private readonly _route: ActivatedRoute) {}

  ngOnInit() {
    this._route.params.pipe(
      switchMap((params: Params) => {
        return this._sandboxService.getFullForecast(params['city'])
      })

    ).subscribe((data) => {
      this.city = data.city.name;
      const timesAndTemperature = this.getTimesAndTemperatures(data.list)
      this.drawChart(timesAndTemperature.times, timesAndTemperature.temperatures);
    })
    
  }

  drawChart(labels: string[], data: number[]): void {
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

  getTimesAndTemperatures(list: ForecastItem[]): TimesAndTemperatures {
    const forecastTimes: string[] = [];
    const forecastTemperatures: number[] = [];

    list.forEach((item: ForecastItem) => {
      forecastTimes.push(item.dt_txt)
      forecastTemperatures.push(item.main.temp)
    })
    
    return { times: forecastTimes, temperatures: forecastTemperatures }
  }
}
