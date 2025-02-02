import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class WeatherService {
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
  private apiKey = 'da90ba71c83ec82d44061d15b12e2518';
  private forecastApiUrl = "https://api.openweathermap.org/data/3.0/onecall";

  constructor(private http: HttpClient) {}

  getWeather(city: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?q=${city}&appid=${this.apiKey}&units=metric`);
  }

  getWeatherForecast(cityName: string): Observable<any> {
    const geocodeUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${this.apiKey}`;
    
    return this.http.get<any>(geocodeUrl).pipe(
      switchMap((data: any) => {
        if (!data.coord) {
          throw new Error("Invalid geocode response: No coordinates found.");
        }
        const lat = data.coord.lat;
        const lon = data.coord.lon;
  
        const forecastUrl = `${this.forecastApiUrl}?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${this.apiKey}&units=metric`;
  
        return this.http.get<any>(forecastUrl); 
      }),
      tap((forecastData) => console.log("Forecast Response:", forecastData.daily)),
      catchError((error) => {
        console.error("Error fetching forecast:", error);
        return of([]); 
      })
    );

    }

}