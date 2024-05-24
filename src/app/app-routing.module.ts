import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ChartComponent } from './components/chart/chart.component';

const routes: Routes = [
  {path: '', redirectTo: '/forecast', pathMatch: 'full'},
  {path: 'forecast', component: MainPageComponent},
  {path: 'chart/:city', component: ChartComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
