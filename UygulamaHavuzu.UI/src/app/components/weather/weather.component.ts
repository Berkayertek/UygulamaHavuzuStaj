import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WeatherService } from '../../services/weather.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    RouterLink,
  ],
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent implements OnInit {
  // OnInit'i ekliyoruz
  sehir: string = ''; // Arama inputuna bağlanacak değişken
  havaDurumu: any = null; // API'dan gelen arama sonucunu tutacak değişken
  hata: string | null = null; // Olası bir hata mesajını tutacak değişken
  populerSehirler: any[] = []; // Popüler şehirleri tutacak yeni dizi

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    // Component ilk yüklendiğinde popüler şehirlerin verisini çek
    this.weatherService.getPopularCitiesWeather().subscribe((data) => {
      this.populerSehirler = data;
    });
  }

  aramaYap(): void {
    this.hata = null; // Her yeni aramada eski hatayı temizle
    this.havaDurumu = null; // Her yeni aramada eski sonucu temizle

    if (this.sehir.trim() === '') {
      return; // Boş arama yapılmasını engelle
    }

    this.weatherService.getWeather(this.sehir).subscribe({
      next: (data) => {
        this.havaDurumu = data; // Başarılı olursa veriyi değişkene ata
      },
      error: (err) => {
        // Hata olursa (örn: şehir bulunamadı), hata mesajını değişkene ata
        this.hata = `"${this.sehir}" için hava durumu bilgisi bulunamadı.`;
        console.error(err); // Hatanın detayını konsola yazdır
      },
    });
  }
}
