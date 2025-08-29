import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuoteService {
  private apiUrl = 'http://localhost:5279/api/quotes/random';

  constructor(private http: HttpClient) {}

  // API'dan rastgele bir özlü söz getiren metot
  getRandomQuote(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
