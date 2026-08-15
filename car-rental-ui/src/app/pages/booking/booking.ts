import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CarService } from '../../core/car.service';
import { Car } from '../../core/car.model';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ThemeToggleComponent } from '../../shared/theme-toggle/theme-toggle.component';
import { LangSwitcherComponent } from '../../shared/lang-switcher/lang-switcher.component';
import { AccountMenuComponent } from '../../shared/account-menu/account-menu.component';
import { LogoComponent } from '../../shared/logo/logo.component';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ThemeToggleComponent, LangSwitcherComponent, AccountMenuComponent, LogoComponent, TranslatePipe],
  templateUrl: './booking.html',
  styleUrl: './booking.css',
})
export class Booking implements OnInit {

  car?: Car;
  carId!: number;
  imageBaseUrl = 'http://159.69.122.189:8080';

  loading = true;
  loadError = '';

  startDate = '';
  endDate = '';
  today = new Date().toISOString().split('T')[0];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private carService: CarService,
    private cdr: ChangeDetectorRef,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.carId = Number(this.route.snapshot.paramMap.get('id'));

    if (!this.carId) {
      this.loading = false;
      this.loadError = this.translate.instant('booking.invalidLink');
      return;
    }

    this.carService.getCarById(this.carId).subscribe({
      next: car => {
        this.car = car;
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: err => {
        this.loading = false;
        this.loadError = err.status === 404
          ? this.translate.instant('booking.carGone')
          : this.translate.instant('booking.loadFailed');
        this.cdr.markForCheck();
      }
    });
  }

  get units(): number {
    if (!this.startDate || !this.endDate || !this.car) return 0;
    const s = new Date(this.startDate);
    const e = new Date(this.endDate);
    if (e < s) return 0;
    if (this.car.rentalPeriod === 'MONTHLY') {
      const months = (e.getFullYear() - s.getFullYear()) * 12 + (e.getMonth() - s.getMonth());
      return months <= 0 ? 1 : months;
    }
    const days = Math.round((e.getTime() - s.getTime()) / 86400000);
    return days <= 0 ? 1 : days;
  }

  get unitLabel(): string {
    return this.car?.rentalPeriod === 'MONTHLY' ? 'month' : 'day';
  }

  get total(): number {
    return this.car ? this.car.price * this.units : 0;
  }

  get valid(): boolean {
    return !!this.startDate && !!this.endDate && this.units > 0;
  }

  continueToPayment() {
    if (!this.valid) return;
    this.router.navigate(['/payment', this.carId], {
      queryParams: { start: this.startDate, end: this.endDate }
    });
  }
}
