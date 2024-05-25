import { Component, Input } from '@angular/core';
import { DayForecast, Today } from 'src/app/entity/interfaces';
import { SandboxService } from 'src/app/entity/sandbox.service';

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
