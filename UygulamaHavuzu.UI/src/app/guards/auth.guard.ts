import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true; // Kullanıcı giriş yapmış, rotaya gitmesine izin ver.
    } else {
      this.router.navigate(['/login']); // Kullanıcı giriş yapmamış, login sayfasına yönlendir.
      return false; // Rotaya gitmesine izin verme.
    }
  }
}
