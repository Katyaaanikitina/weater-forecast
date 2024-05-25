import { Component, Input } from '@angular/core';
import { SandboxService } from 'src/app/shared/services/forecast.service';
import { DayForecast, Today } from 'src/app/shared/interfaces/forecast';

@Component({
  selector: 'app-day-card',
  templateUrl: './day-card.component.html',
  styleUrls: ['./day-card.component.scss']
})
export class DayCardComponent {
  @Input() dayWeatherFull!: DayForecast;
  dayWeather!: Today;
  panelOpenState = false;

  constructor(private readonly _sandboxService: SandboxService) {}
  
  ngOnInit() {
    this.dayWeather = this._sandboxService.formDayForecast(this.dayWeatherFull);
  }
}
