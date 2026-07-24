import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../core/auth.service';
import { LogoComponent } from '../../shared/logo/logo.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, LogoComponent, TranslatePipe],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router, private translate: TranslateService) {}

  get googleLoginUrl() {
    return this.authService.googleLoginUrl;
  }

  onLogin() {
    this.authService.login(this.email, this.password)
      .subscribe({
        next: (res: any) => {
          localStorage.setItem("token", res.token);
          this.router.navigate(['/cars']);
        },
        error: (err) => {
          console.log("LOGIN ERROR", err);
          alert(this.translate.instant('auth.wrongCredentials'));
        }
      });
  }
}
