import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, map } from 'rxjs';
import { City, Forecast, ForecastItem } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class SandboxService {

  constructor(private readonly _apiService: ApiService) { }

  getForecastListByDays(city: string): Observable<Record<string, ForecastItem[]>> {  
    return this._apiService.getForecastByCity(city).pipe(
      map((data) => {
       return data.list.reduce((acc: Record<string, ForecastItem[]>, curr) => {
          const date = curr.dt_txt.split(' ')[0];
          (!acc[date]) ? acc[date] = [curr] : acc[date].push(curr)
          return acc;
        }, {})
      })
    );
  }
  
  getCityInfo(city: string): Observable<City> {
    return this._apiService.getForecastByCity(city).pipe(map((data) => data.city));
  }

}
