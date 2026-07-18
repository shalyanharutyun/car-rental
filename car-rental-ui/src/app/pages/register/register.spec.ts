import { RegisterComponent } from './pages/register/register.component';
import {CarsComponent} from '../cars/cars';
import {LoginComponent} from '../login/login.component';
import {Routes} from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' as const },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'cars', component: CarsComponent }
];
