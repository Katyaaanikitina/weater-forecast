import { NgModule } from "@angular/core";
import { InfographicRoutingModule } from "./infographic-routing.module";
import { ChartComponent } from "./components/chart/chart.component";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [
      ChartComponent
    ],
    imports: [
      CommonModule,
      InfographicRoutingModule,
    ]
  })
  export class InfographicModule { }