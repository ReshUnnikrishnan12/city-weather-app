import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private UNSPLASH_ACCESS_KEY = environment.unSplashApiKey; 
  private UNSPLASH_API_URL = environment.unSplashApiBaseUrl;

  constructor(private http: HttpClient) {}

  getCityImage(city: string): Observable<string> {
    const url = `${this.UNSPLASH_API_URL}?query=${city}&client_id=${this.UNSPLASH_ACCESS_KEY}&per_page=1`;

    return this.http.get<any>(url).pipe(
      tap(response => console.log(`Fetched image for ${city}:`, response)),
      map(response => {
        const imageUrl = response.results[0]?.urls?.regular;
        if (!imageUrl) {
          console.warn(`No image found for ${city}.`);
          return ''; 
        }
        return imageUrl;
      }),
      catchError(error => {
        console.error(`Error fetching image for ${city}:`, error);
        return of('');
      })
    );
  }
}
