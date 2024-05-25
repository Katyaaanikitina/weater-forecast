import { ForecastModule } from './forecast/forecast.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: '/forecast', pathMatch: 'full'},
  {path: 'forecast', loadChildren: () => import('./forecast/forecast.module').then(m => m.ForecastModule)},
  {path: 'chart/:city', loadChildren: () => import('./infographic/infographic.module').then(m => m.InfographicModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
