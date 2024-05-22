import { Component } from '@angular/core';
import { SandboxService } from '../entity/sandbox.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {
  constructor(private readonly _sandboxService: SandboxService) {}

  ngOnInit() {
    this._sandboxService.getForecastListByDays('Warsaw').subscribe((data) => {
      console.log(data)
    })
  }
}
