import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VkiService {
  private apiUrl = 'http://localhost:5279/api/vki'; // VkiController'ımızın ana adresi

  constructor(private http: HttpClient) {}

  hesaplaVki(data: { boy: number; kilo: number }): Observable<any> {
    // POST isteğini /hesapla endpoint'ine gönderiyoruz
    return this.http.post<number>(`${this.apiUrl}/hesapla`, data);
  }
}
