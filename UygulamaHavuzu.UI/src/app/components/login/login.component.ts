import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router'; // 1. RouterLink'i buraya ekle
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    RouterLink, // 2. RouterLink'i buraya ekle
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginData = {
    username: '',
    password: '',
  };
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    this.errorMessage = null;
    this.authService.login(this.loginData).subscribe({
      next: (response) => {
        // BAŞARILI GİRİŞ DURUMU
        console.log('Giriş başarılı: - login.component.ts:36', response);
        // TODO: Gelen token'ı burada saklayacağız. Şimdilik direkt yönlendiriyoruz.
        this.router.navigate(['/anasayfa']); // Kullanıcıyı ana sayfaya yönlendir
      },
      error: (err) => {
        // HATALI GİRİŞ DURUMU
        console.error('Giriş hatası: - login.component.ts:42', err);
        // Backend'den bir hata mesajı gelirse onu kullan, gelmezse varsayılan mesajı göster
        if (err.error && typeof err.error === 'string') {
          this.errorMessage = err.error;
        } else {
          this.errorMessage = 'Kullanıcı adı veya şifre hatalı.';
        }
      },
    });
  }
}
