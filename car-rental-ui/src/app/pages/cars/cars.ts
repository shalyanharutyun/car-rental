import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CarService } from '../../core/car.service';
import { Car } from '../../core/car.model';
import { NotificationService } from '../../core/notification.service';
import { ThemeToggleComponent } from '../../shared/theme-toggle/theme-toggle.component';
import { AccountMenuComponent } from '../../shared/account-menu/account-menu.component';
import { LogoComponent } from '../../shared/logo/logo.component';
import { WhyChooseComponent } from '../../shared/why-choose/why-choose.component';
import { ARMENIA_REGIONS, ArmeniaRegion, buildLocation } from '../../core/armenia-locations';

@Component({
  selector: 'app-cars',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ThemeToggleComponent, AccountMenuComponent, LogoComponent, WhyChooseComponent],
  templateUrl: './cars.html'
})
export class CarsComponent implements OnInit {

  cars: Car[] = [];
  imageBaseUrl = 'http://159.69.122.189:8080';
  unread = 0;

  page = 0;
  pageSize = 12;
  totalPages = 0;

  regions = ARMENIA_REGIONS;
  years: number[];
  filterYearFrom: number | null = null;
  filterYearTo: number | null = null;
  filterRegion = '';
  filterDistrict = '';

  constructor(
    private carService: CarService,
    private notificationService: NotificationService,
    private cdr: ChangeDetectorRef
  ) {
    const currentYear = new Date().getFullYear();
    this.years = Array.from({ length: currentYear - 1989 }, (_, i) => currentYear - i);
  }

  ngOnInit() {
    this.loadCars();
    if (this.isLoggedIn) {
      this.notificationService.unreadCount().subscribe({
        next: res => { this.unread = res.count; this.cdr.markForCheck(); },
        error: () => {}
      });
    }
  }

  get selectedFilterRegion(): ArmeniaRegion | undefined {
    return this.regions.find(r => r.name === this.filterRegion);
  }

  onFilterRegionChange() {
    this.filterDistrict = '';
    this.applyFilters();
  }

  applyFilters() {
    this.page = 0;
    this.loadCars();
  }

  clearFilters() {
    this.filterYearFrom = null;
    this.filterYearTo = null;
    this.filterRegion = '';
    this.filterDistrict = '';
    this.applyFilters();
  }

  private get filterLocation(): string | null {
    if (!this.filterRegion) {
      return null;
    }
    return this.filterDistrict ? buildLocation(this.filterRegion, this.filterDistrict) : this.filterRegion;
  }

  loadCars() {
    this.carService.getCars(this.page, this.pageSize, this.filterYearFrom, this.filterYearTo, this.filterLocation).subscribe(result => {
      this.cars = result.content;
      this.totalPages = result.totalPages;
      this.cdr.markForCheck();
    });
  }

  goToPage(page: number) {
    if (page < 0 || page >= this.totalPages || page === this.page) return;
    this.page = page;
    this.loadCars();
  }

  get pageItems(): (number | '...')[] {
    const total = this.totalPages;
    const current = this.page;
    const delta = 1;
    const items: (number | '...')[] = [];
    let lastShown = -1;

    for (let i = 0; i < total; i++) {
      const isEdge = i === 0 || i === total - 1;
      const isNearCurrent = i >= current - delta && i <= current + delta;

      if (isEdge || isNearCurrent) {
        if (lastShown !== -1 && i - lastShown > 1) {
          items.push('...');
        }
        items.push(i);
        lastShown = i;
      }
    }

    return items;
  }

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  periodLabel(car: Car): string {
    return car.rentalPeriod === 'MONTHLY' ? 'month' : 'day';
  }
}
