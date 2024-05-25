import { Component } from '@angular/core';
import { SandboxService } from '../../entity/sandbox.service';
import { City, DayForecast, Today } from '../../entity/interfaces';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {
  weatherList!: DayForecast[];
  today!: Today;
  city!: City;
  isCityHasForecast = true;
  averageWeekPressure!: number;

  constructor(private readonly _sandboxService: SandboxService) {}

  ngOnInit() {
    this.loadForecast('warsaw');
  }

  loadForecast(location: string): void {
    this.isCityHasForecast = true;
    const locationArray = location.split(',');
    const city = locationArray[0];

    this._sandboxService.getFullForecast(city).subscribe((data) => {
      this._sandboxService.fullForecast = data;
      this.weatherList = this._sandboxService.getForecastListByDays();
      this.today = this._sandboxService.formDayForecast(this.weatherList[0]);
      this.city = this._sandboxService.getCityInfo();
      this.averageWeekPressure = this.calcAverageWeekPressure(this.weatherList)

    }, (error) => {
      this.isCityHasForecast = false;
    })
  }

  calcAverageWeekPressure(list: DayForecast[]): number {
    const allWeekPressure = list.reduce((acc: number[][], curr) => {
      acc.push(curr.allDayPressure)
      return acc
    }, []);

    return this._sandboxService.getAverageNumber(allWeekPressure.flat());
  }
}
