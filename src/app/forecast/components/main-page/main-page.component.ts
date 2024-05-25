import { Component } from '@angular/core';
import { SandboxService } from '../../../shared/services/forecast.service';
import { Subscription } from 'rxjs';
import { City, DayForecast, Today } from 'src/app/shared/interfaces/forecast';
import { UtilitiesService } from 'src/app/shared/services/utilities.service';

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
  subscription!: Subscription;

  constructor(private readonly _sandboxService: SandboxService,
              private readonly _utilitiesService: UtilitiesService) {}

  ngOnInit() {
    this.loadForecast('warsaw');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  loadForecast(city: string): void {
    this.isCityHasForecast = true;

    this.subscription = this._sandboxService.getFullForecast(city).subscribe((data) => {
      this._sandboxService.fullForecast = data;
      this.weatherList = this._sandboxService.getForecastListByDays();
      this.today = this._sandboxService.formDayForecast(this.weatherList[0]);
      this.city = this._sandboxService.getCityInfo();
      this.averageWeekPressure = this._calcAverageWeekPressure(this.weatherList)

    }, (error) => {
      this.isCityHasForecast = false;
    })
  }

  private _calcAverageWeekPressure(list: DayForecast[]): number {
    const allWeekPressure = list.reduce((acc: number[][], curr) => {
      acc.push(curr.allDayPressure)
      return acc
    }, []);

    return this._utilitiesService.getAverageNumber(allWeekPressure.flat());
  }
}
