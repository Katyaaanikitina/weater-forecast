import { Component } from '@angular/core';
import { SandboxService } from '../entity/sandbox.service';
import { ForecastItem, Today } from '../entity/interfaces';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {
  weatherList!: Record<string, any>;
  today!: Today;

  constructor(private _sandboxService: SandboxService) {}

  ngOnInit() {
    this._sandboxService.getFullForecast('Warsaw').subscribe((data) => {
      this._sandboxService.fullForecast = data;
      this.weatherList = this._sandboxService.getForecastListByDays();

      this.today = this._sandboxService.formDayForecast(Object.values(this.weatherList)[0]);
    })
  }
}
