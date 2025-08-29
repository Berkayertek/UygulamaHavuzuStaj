import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiUrl = 'http://localhost:5279/api/weather'; // WeatherController'ımızın ana adresi

  constructor(private http: HttpClient) {}

  // Belirtilen şehir için hava durumu verisini getiren metot
  getWeather(city: string): Observable<any> {
    // GET isteğini /api/weather/{şehirAdı} endpoint'ine gönderiyoruz
    return this.http.get<any>(`${this.apiUrl}/${city}`);
  }
  getPopularCitiesWeather(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/popular`);
  }
}
