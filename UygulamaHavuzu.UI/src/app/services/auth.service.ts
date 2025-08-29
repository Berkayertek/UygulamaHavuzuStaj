import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs'; // 'tap' operatörünü import ediyoruz
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5279/api/auth';

  constructor(private http: HttpClient, private router: Router) {} // Router'ı inject ediyoruz

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(user: any): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/login`, user, { responseType: 'text' })
      .pipe(
        tap((response) => {
          // Başarılı giriş sonrası backend'den bir token beklediğimizi varsayalım.
          // Şimdilik "Giriş Başarılı!" metnini token olarak kabul edip saklayalım.
          localStorage.setItem('token', response);
        })
      );
  }

  // Kullanıcının giriş yapıp yapmadığını kontrol eden metot
  isLoggedIn(): boolean {
    // Eğer localStorage'da 'token' varsa, kullanıcı giriş yapmıştır.
    return !!localStorage.getItem('token');
  }

  // Çıkış yapma metodu
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']); // Kullanıcıyı login sayfasına yönlendir
  }
}
