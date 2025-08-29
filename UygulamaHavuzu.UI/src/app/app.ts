import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Yeni component'lerimizi ve diğerlerini buraya import etmemiz gerekmiyor,
// çünkü artık RouterOutlet onları yönetecek. Sadece RouterOutlet'ın kendisi yeterli.
// Ancak, rotaların düzgün çalışması için, rotada kullanılan tüm componentlerin
// "standalone: true" olduğundan ve kendi importlarına sahip olduğundan emin olmalıyız.
// Bir önceki adımlarda bunu zaten yapmıştık.

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, // Yönlendiricinin componentleri göstereceği yer
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class AppComponent {
  title = 'UygulamaHavuzu.UI';
}
