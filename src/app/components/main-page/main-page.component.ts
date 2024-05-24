import { Component } from '@angular/core';
import { SandboxService } from '../../entity/sandbox.service';
import { City, ForecastItem, Today } from '../../entity/interfaces';
import { ApiService } from '../../entity/api.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {
  weatherList!: any[];
  today!: Today;
  city!: City;
  isCityHasForecast = true;

  constructor(private _sandboxService: SandboxService) {}

  ngOnInit() {
    this.loadForecast('warsaw');
  }

  loadForecast(location: string) {
    this.isCityHasForecast = true;
    const locationArray = location.split(',');
    const city = locationArray[0];

    this._sandboxService.getFullForecast(city).subscribe((data) => {
      this._sandboxService.fullForecast = data;
      this.weatherList = Object.values(this._sandboxService.getForecastListByDays());

      this.today = this._sandboxService.formDayForecast(this.weatherList[0]);
      this.city = this._sandboxService.getCityInfo();

    }, (error) => {
      this.isCityHasForecast = false;
    })
  }
}
