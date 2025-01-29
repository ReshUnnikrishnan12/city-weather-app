import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private UNSPLASH_ACCESS_KEY = 'xUK66IBDUyvH5vzT4lzYlMoeb0dTHvbjFxmKWdMm5TI';
  private UNSPLASH_API_URL = 'https://api.unsplash.com/search/photos';

  constructor(private http: HttpClient) {}

  getCityImage(city: string): Observable<string> {
    const url = `${this.UNSPLASH_API_URL}?query=${city}&client_id=${this.UNSPLASH_ACCESS_KEY}&per_page=1`;

    return this.http.get<any>(url).pipe(
      map(response => response.results[0]?.urls?.regular || '')
    );
  }
}
