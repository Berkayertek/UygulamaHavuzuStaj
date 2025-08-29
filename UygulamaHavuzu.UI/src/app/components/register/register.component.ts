import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router'; // 1. RouterLink'i buraya ekle
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    RouterLink, // 2. RouterLink'i buraya ekle
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerData = {
    username: '',
    password: '',
  };
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  onRegister(): void {
    this.errorMessage = null;
    this.successMessage = null;

    this.authService.register(this.registerData).subscribe({
      next: (response) => {
        this.successMessage =
          'Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz...';
        // Kayıt başarılı olduktan 2 saniye sonra kullanıcıyı login sayfasına yönlendir
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err) => {
        // "Kullanıcı adı zaten mevcut" gibi hataları backend'den alıp göster
        if (err.error && typeof err.error === 'string') {
          this.errorMessage = err.error;
        } else {
          this.errorMessage = 'Bir hata oluştu. Lütfen tekrar deneyin.';
        }
      },
    });
  }
}
