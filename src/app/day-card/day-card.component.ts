import { Component, Input } from '@angular/core';
import { Today } from '../entity/interfaces';
import { SandboxService } from '../entity/sandbox.service';

@Component({
  selector: 'app-day-card',
  templateUrl: './day-card.component.html',
  styleUrls: ['./day-card.component.scss']
})
export class DayCardComponent {
  @Input() dayWeather!: Today;
  panelOpenState = false;

  constructor(private _sandboxService: SandboxService) {}
  
  ngOnInit() {
    console.log(this.dayWeather)
    this.dayWeather = this._sandboxService.formDayForecast(this.dayWeather);
  }
}
