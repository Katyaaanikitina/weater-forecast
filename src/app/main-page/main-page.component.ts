import { Component } from '@angular/core';
import { SandboxService } from '../entity/sandbox.service';
import { City, ForecastItem, Today } from '../entity/interfaces';
import { ApiService } from '../entity/api.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {
  weatherList!: any[];
  today!: Today;
  city!: City;

  constructor(private _sandboxService: SandboxService) {}

  ngOnInit() {
    this._sandboxService.getFullForecast('Warsaw').subscribe((data) => {
      this._sandboxService.fullForecast = data;
      this.weatherList = Object.values(this._sandboxService.getForecastListByDays());

      this.today = this._sandboxService.formDayForecast(this.weatherList[0]);
      this.city = this._sandboxService.getCityInfo();
    })
  }
}
