import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, switchMap, tap, throwError } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})

export class WeatherService {
  private cityWeatherApiUrl = environment.cityWeatherApiBaseUrl;
  private weatherApiKey = environment.weatherApiKey;
  private forecastApiUrl = environment.forecastApiBaseUrl;

  constructor(private http: HttpClient) {}

  getWeather(city: string): Observable<any> {
    const weatherUrl = `${this.cityWeatherApiUrl}?q=${city}&appid=${this.weatherApiKey}&units=metric`;
    
    return this.http.get<any>(weatherUrl).pipe(
      tap(data => console.log(`Weather data fetched for ${city}:`, data)),
      catchError(error => {
        console.error(`Error fetching weather for ${city}:`, error);
        return throwError(() => new Error(`Unable to fetch weather for ${city}. Please try again later.`));
      })
    );
  }

  getWeatherForecast(cityName: string): Observable<any> {
    const geocodeUrl = `${this.cityWeatherApiUrl}?q=${cityName}&appid=${this.weatherApiKey}`;
    
    return this.http.get<any>(geocodeUrl).pipe(
      switchMap((data: any) => {
        if (!data.coord) {
          console.error(`Invalid geocode response for ${cityName}: No coordinates found.`);
          return throwError(() => new Error(`Coordinates not found for ${cityName}.`));
        }

        const { lat, lon } = data.coord;
        const forecastUrl = `${this.forecastApiUrl}?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${this.weatherApiKey}&units=metric`;

        return this.http.get<any>(forecastUrl).pipe(
          tap(forecastData => console.log(`Forecast data for ${cityName}:`, forecastData)),
          catchError(forecastError => {
            console.error(`Error fetching forecast for ${cityName}:`, forecastError);
            return throwError(() => new Error(`Unable to fetch forecast for ${cityName}. Please try again later.`));
          })
        );
      }),
      catchError(geocodeError => {
        console.error(`Error fetching geocode for ${cityName}:`, geocodeError);
        return of([]);
      })
    );
  }

}