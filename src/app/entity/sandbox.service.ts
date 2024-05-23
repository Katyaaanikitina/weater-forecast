import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, Subject, map } from 'rxjs';
import { City, Forecast, ForecastItem } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class SandboxService {
  fullForecast!: Forecast;
  forecastListByDays!: Record<string, ForecastItem[]>;

  constructor(private readonly _apiService: ApiService) { }

  getFullForecast(city: string): Observable<Forecast> { 
    return this._apiService.getForecastByCity(city).pipe()
  }

  getCityInfo(): City {
    return this.fullForecast.city
  }

  getForecastListByDays(): Record<string, ForecastItem[]> {  
    return this.fullForecast.list.reduce((acc: Record<string, any>, curr) => {
      const date = curr.dt_txt.split(' ')[0];
      const newForecastItem = {date: date, list: [curr], 
                               allDayTemp: [curr.main.temp], 
                               allDayWeather: [curr.weather[0].description],
                               allDayIcon: [curr.weather[0].icon]}

      if (!acc[date]) {
        acc[date] = newForecastItem;
      } else {
        acc[date].list.push(newForecastItem);
        acc[date].allDayTemp.push(curr.main.temp);
        acc[date].allDayWeather.push(curr.weather[0].description);
        acc[date].allDayIcon.push(curr.weather[0].icon);
      }

      return acc;
    }, {})
  }

  formDayForecast(originalDay: any) {
    originalDay['allDayIcon'] = this.getMostOftenElementInArray(originalDay.allDayIcon);
    originalDay['allDayWeather'] = this.getMostOftenElementInArray(originalDay.allDayWeather);
    originalDay['allDayTemp'] = this.getAverageNumber(originalDay.allDayTemp);
    return originalDay;
  }

  getAverageNumber(array: number[]): number {
      const sum = array.reduce((acc: number, curr: number) => {
        return acc + curr
      }, 0);

      return Math.round(sum / array.length);
  }

  getMostOftenElementInArray(array: string[]): string {
    let hashMap: Record<any, number> = {};
    let max = '';
    let maxi = 0;

    array.forEach((element) => {
      (hashMap[element]) ? hashMap[element]++ : hashMap[element] = 1;
      if (maxi < hashMap[element]) {
        max = element;
        maxi = hashMap[element];
      }
    });

    return max;
  }
}