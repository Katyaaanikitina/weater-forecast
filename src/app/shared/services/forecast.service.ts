import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, map } from 'rxjs';
import { City, DayForecast, Forecast, Today } from '../interfaces/forecast';
import { UtilitiesService } from './utilities.service';

@Injectable({
  providedIn: 'root'
})
export class SandboxService {
  fullForecast!: Forecast; 

  constructor(private readonly _apiService: ApiService,
              private readonly _utilitiesService: UtilitiesService) { }

  getFullForecast(city: string): Observable<Forecast> { 
    return this._apiService.getForecastByCity(city)
  }

  getCityInfo(): City {
    return this.fullForecast.city
  }

  getForecastListByDays(): DayForecast[] {  
    const listByDays = this.fullForecast.list.reduce((acc: Record<string, DayForecast>, curr) => {
      const [date] = curr.dt_txt?.split(' ') ?? [];
      
      const newForecastItem = {date: date, 
                               list: [curr],
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

    return Object.values(listByDays)
  }

  formDayForecast(originalDay: DayForecast): Today {
    return {
      allDayIcon: this._utilitiesService.getMostOftenElementInArray(originalDay.allDayIcon),
      allDayWeather: this._utilitiesService.getMostOftenElementInArray(originalDay.allDayWeather),
      allDayTemp: this._utilitiesService.getAverageNumber(originalDay.allDayTemp),
      allDayPressure: this._utilitiesService.getAverageNumber(originalDay.allDayPressure),
      allDayFeelsLike: this._utilitiesService.getAverageNumber(originalDay.allDayFeelsLike),
      date: originalDay.date,
      list: originalDay.list
    }
  }

  getCities(searchValue: string): Observable<string[]> {
    return this._apiService.getCitiesList(searchValue).pipe(map((data) => { 

      return Object.values(data).map((city) => {
        const cityNames = []; 

        cityNames.push(city.name);
        if (city.state) cityNames.push(city.state);
        cityNames.push(city.country);

        return cityNames.join(',');
      })
    }))
  }
}