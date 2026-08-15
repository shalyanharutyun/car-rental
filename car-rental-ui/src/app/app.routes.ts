import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { OAuth2RedirectComponent } from './pages/oauth2-redirect/oauth2-redirect.component';
import { CarsComponent } from './pages/cars/cars';
import { AddCarComponent } from './pages/add-car/add-car.component';
import { MyCarsComponent } from './pages/my-cars/my-cars.component';
import { CarDetailComponent } from './pages/car-detail/car-detail.component';
import { Booking } from './pages/booking/booking';
import { Payment } from './pages/payment/payment';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { authGuard } from './core/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'cars', pathMatch: 'full' as const },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'oauth2/redirect', component: OAuth2RedirectComponent },
  { path: 'cars', component: CarsComponent },
  { path: 'cars/add', component: AddCarComponent, canActivate: [authGuard] },
  { path: 'cars/mine', component: MyCarsComponent, canActivate: [authGuard] },
  { path: 'notifications', component: NotificationsComponent, canActivate: [authGuard] },
  { path: 'booking/:id', component: Booking, canActivate: [authGuard] },
  { path: 'payment/:id', component: Payment, canActivate: [authGuard] },
  { path: 'cars/:id', component: CarDetailComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'cars' }
];