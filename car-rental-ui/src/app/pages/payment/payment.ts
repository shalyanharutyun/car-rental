import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CarService } from '../../core/car.service';
import { BookingService, PaymentMethod } from '../../core/booking.service';
import { Car } from '../../core/car.model';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ThemeToggleComponent } from '../../shared/theme-toggle/theme-toggle.component';
import { LangSwitcherComponent } from '../../shared/lang-switcher/lang-switcher.component';
import { AccountMenuComponent } from '../../shared/account-menu/account-menu.component';
import { LogoComponent } from '../../shared/logo/logo.component';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ThemeToggleComponent, LangSwitcherComponent, AccountMenuComponent, LogoComponent, TranslatePipe],
  templateUrl: './payment.html',
  styleUrl: './payment.css',
})
export class Payment implements OnInit {

  car?: Car;
  carId!: number;
  startDate = '';
  endDate = '';

  loading = true;
  loadError = '';

  paymentMethod: PaymentMethod = 'CARD';

  cardName = '';
  cardNumber = '';
  expiry = '';
  cvc = '';

  processing = false;
  done = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private carService: CarService,
    private bookingService: BookingService,
    private cdr: ChangeDetectorRef,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.carId = Number(this.route.snapshot.paramMap.get('id'));
    this.startDate = this.route.snapshot.queryParamMap.get('start') || '';
    this.endDate = this.route.snapshot.queryParamMap.get('end') || '';

    if (!this.carId || !this.startDate || !this.endDate) {
      this.loading = false;
      this.loadError = this.translate.instant('payment.missingDates');
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
          ? this.translate.instant('payment.carGone')
          : this.translate.instant('payment.loadFailed');
        this.cdr.markForCheck();
      }
    });
  }

  get units(): number {
    if (!this.startDate || !this.endDate || !this.car) return 0;
    const s = new Date(this.startDate);
    const e = new Date(this.endDate);
    if (this.car.rentalPeriod === 'MONTHLY') {
      const months = (e.getFullYear() - s.getFullYear()) * 12 + (e.getMonth() - s.getMonth());
      return months <= 0 ? 1 : months;
    }
    const days = Math.round((e.getTime() - s.getTime()) / 86400000);
    return days <= 0 ? 1 : days;
  }

  get total(): number {
    return this.car ? this.car.price * this.units : 0;
  }

  get payLabel(): string {
    const amount = this.total + ' ' + (this.car?.currency ?? '');
    return this.paymentMethod === 'CASH'
      ? this.translate.instant('payment.confirmBooking')
      : this.translate.instant('payment.payAmount', { amount });
  }

  get formValid(): boolean {
    if (this.paymentMethod === 'CASH') return true;
    return this.cardName.trim().length > 0
      && this.cardNumber.replace(/\s/g, '').length >= 12
      && this.expiry.trim().length >= 4
      && this.cvc.trim().length >= 3;
  }

  selectMethod(method: PaymentMethod) {
    this.paymentMethod = method;
    this.error = '';
  }

  pay() {
    if (!this.formValid || this.processing) return;
    this.processing = true;
    this.error = '';
    this.bookingService.createBooking({
      carId: this.carId,
      startDate: this.startDate,
      endDate: this.endDate,
      paymentMethod: this.paymentMethod
    }).subscribe({
      next: () => {
        this.processing = false;
        this.done = true;
        this.cdr.markForCheck();
      },
      error: err => {
        this.processing = false;
        this.error = err?.error?.message
          || this.translate.instant('payment.payFailed');
        this.cdr.markForCheck();
      }
    });
  }
}