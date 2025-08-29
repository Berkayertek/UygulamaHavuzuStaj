import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common'; // ngClass ve ngFor için gerekli
import { ButtonModule } from 'primeng/button'; // pButton için gerekli
import { AppCard } from '../../models/app-card.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, // Eklendi
    RouterLink,
    ButtonModule, // Eklendi
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  // Uygulamalarımızı bir liste olarak tanımlıyoruz
  apps: AppCard[] = [
    {
      title: 'Yapılacaklar Listesi',
      description: 'Günlük görevlerinizi yönetin.',
      route: '/yapilacaklar',
      cssClass: 'todo-card',
    },
    {
      title: 'VKİ Hesaplayıcı',
      description: 'Vücut kitle endeksinizi öğrenin.',
      route: '/vki',
      cssClass: 'vki-card',
    },
    {
      title: 'Günün Sözü',
      description: 'Her gün yeni bir ilham alın.',
      route: '/ozlusoz',
      cssClass: 'quote-card',
    },
    {
      title: 'Hava Durumu',
      description: 'Şehrinizin hava durumunu kontrol edin.',
      route: '/havadurumu',
      cssClass: 'weather-card',
    },
  ];

  // AuthService'i constructor'a inject ediyoruz
  constructor(private authService: AuthService) {}

  // Eksik olan logout metodunu ekliyoruz
  logout(): void {
    this.authService.logout();
  }
}
