import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app'; // Dosya adın app.ts ise app.component olarak değiştirme

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
