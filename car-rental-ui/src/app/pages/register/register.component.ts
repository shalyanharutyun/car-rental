import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { LogoComponent } from '../../shared/logo/logo.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink, LogoComponent],
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnDestroy {

  firstName = '';
  lastName = '';
  email = '';
  password = '';
  code = '';
  step = 1;

  errorMessage = '';
  secondsLeft = 0;
  private timerId: any = null;

  constructor(private authService: AuthService, private router: Router, private cdr: ChangeDetectorRef) {}

  get googleLoginUrl() {
    return this.authService.googleLoginUrl;
  }

  get expired() {
    return this.secondsLeft <= 0;
  }

  get timeDisplay() {
    const m = Math.floor(this.secondsLeft / 60);
    const s = this.secondsLeft % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  }

  onRegister() {
    this.errorMessage = '';
    this.authService.register(this.firstName, this.lastName, this.email, this.password)
      .subscribe({
        next: () => {
          this.step = 2;
          this.code = '';
          this.startTimer();
          this.cdr.markForCheck();
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Registration failed';
          this.cdr.markForCheck();
        }
      });
  }

  onVerify() {
    this.errorMessage = '';

    if (this.expired) {
      this.errorMessage = 'Verification code expired. Please resend a new code.';
      return;
    }

    this.authService.verify(this.email, this.code)
      .subscribe({
        next: (res: any) => {
          this.stopTimer();
          localStorage.setItem("token", res.token);
          this.router.navigate(['/cars']);
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Invalid verification code';
          this.cdr.markForCheck();
        }
      });
  }

  resendCode() {
    this.onRegister();
  }

  private startTimer() {
    this.stopTimer();
    this.secondsLeft = 180;
    this.timerId = setInterval(() => {
      this.secondsLeft--;
      if (this.secondsLeft <= 0) {
        this.stopTimer();
      }
      this.cdr.markForCheck();
    }, 1000);
  }

  private stopTimer() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  ngOnDestroy() {
    this.stopTimer();
  }
}
