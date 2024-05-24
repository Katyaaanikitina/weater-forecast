import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, debounceTime, map } from 'rxjs';
import { City, Forecast, ForecastItem, Today } from './interfaces';

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
                               allDayIcon: [curr.weather[0].icon],
                               allDayPressure: [curr.main.pressure],
                               allDayFeelsLike: [curr.main.feels_like]}
      
      if (!acc[date]) {
        acc[date] = newForecastItem;
      } else {
        acc[date].list.push(curr);
        acc[date].allDayTemp.push(curr.main.temp);
        acc[date].allDayWeather.push(curr.weather[0].description);
        acc[date].allDayIcon.push(curr.weather[0].icon);
        acc[date].allDayPressure.push(curr.main.pressure);
        acc[date].allDayFeelsLike.push(curr.main.feels_like);
      }

      return acc;
    }, {})
  }

  formDayForecast(originalDay: any): Today {
    return {
      allDayIcon: this.getMostOftenElementInArray(originalDay.allDayIcon),
      allDayWeather: this.getMostOftenElementInArray(originalDay.allDayWeather),
      allDayTemp: this.getAverageNumber(originalDay.allDayTemp),
      allDayPressure: this.getAverageNumber(originalDay.allDayPressure),
      allDayFeelsLike: this.getAverageNumber(originalDay.allDayFeelsLike),
      date: originalDay.date,
      list: originalDay.list
    }
  }

  getCities(searchValue: string) {
    return this._apiService.getCitiesList(searchValue).pipe(map((data) => { 
      const stringsArray: any[] = []

      Object.values(data).forEach((city) => {
        const stringLocation = [];

        stringLocation.push(city.name);
        if (city.state) stringLocation.push(city.state);
        stringLocation.push(city.country);

        stringsArray.push(stringLocation.join(', '))
      })

      return stringsArray;
    }))
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