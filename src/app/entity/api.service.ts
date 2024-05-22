import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Forecast } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private readonly _http: HttpClient) { }

  getForecastByCity(city: string): Observable<Forecast> {
    return this._http.get<Forecast>(`${environment.API_BASE_URL}?q=${city}&APPID=e932b12ca04693ba06e7ce1c79e4d9f4&units=metric`)
  }
}
