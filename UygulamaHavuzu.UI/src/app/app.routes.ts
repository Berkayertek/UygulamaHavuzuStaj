import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

// AuthGuard'ı import ediyoruz
import { AuthGuard } from './guards/auth.guard';

// Diğer component'leri de import edelim
import { TodoListComponent } from './components/todo-list/todo-list';
import { VkiCalculatorComponent } from './components/vki-calculator/vki-calculator.component';
import { QuoteComponent } from './components/quote/quote.component';
import { WeatherComponent } from './components/weather/weather.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // KORUMA ALTINA ALINAN ROTALAR
  // Bu rotalara erişilmeden önce AuthGuard çalışacak
  { path: 'anasayfa', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'yapilacaklar',
    component: TodoListComponent,
    canActivate: [AuthGuard],
  },
  { path: 'vki', component: VkiCalculatorComponent, canActivate: [AuthGuard] },
  { path: 'ozlusoz', component: QuoteComponent, canActivate: [AuthGuard] },
  { path: 'havadurumu', component: WeatherComponent, canActivate: [AuthGuard] },
];
