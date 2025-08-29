import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { VkiService } from '../../services/vki.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber'; // InputNumber için eklendi

@Component({
  selector: 'app-vki-calculator',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputNumberModule, // Eklendi
    RouterLink,
  ],
  templateUrl: './vki-calculator.component.html',
  styleUrls: ['./vki-calculator.component.css'],
})
export class VkiCalculatorComponent {
  boy: number | null = null;
  kilo: number | null = null;
  sonuc: any | null = null;

  constructor(private vkiService: VkiService) {}

  hesapla(): void {
    if (this.boy && this.kilo && this.boy > 0 && this.kilo > 0) {
      const model = { boy: this.boy, kilo: this.kilo };
      this.vkiService.hesaplaVki(model).subscribe((gelenSonuc) => {
        this.sonuc = gelenSonuc;
      });
    } else {
      this.sonuc = null;
      // alert'i daha sonra şık bir mesaja çevirebiliriz
      alert('Lütfen geçerli boy (metre) ve kilo değerleri giriniz.');
    }
  }

  // Sonuca göre CSS sınıfı döndüren metot
  getSonucClass(): string {
    if (!this.sonuc) return '';

    switch (this.sonuc.sonucMetni) {
      case 'Zayıf':
        return 'zayif';
      case 'Normal Kilo':
        return 'normal';
      case 'Fazla Kilolu':
        return 'fazla-kilolu';
      case 'Obez':
        return 'obez';
      default:
        return '';
    }
  }
}
