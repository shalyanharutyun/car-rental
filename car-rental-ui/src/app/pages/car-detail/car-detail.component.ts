import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { CarService } from '../../core/car.service';
import { Car } from '../../core/car.model';
import { TranslatePipe } from '@ngx-translate/core';
import { ThemeToggleComponent } from '../../shared/theme-toggle/theme-toggle.component';
import { LangSwitcherComponent } from '../../shared/lang-switcher/lang-switcher.component';
import { AccountMenuComponent } from '../../shared/account-menu/account-menu.component';
import { LogoComponent } from '../../shared/logo/logo.component';

@Component({
  selector: 'app-car-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, ThemeToggleComponent, LangSwitcherComponent, AccountMenuComponent, LogoComponent, TranslatePipe],
  templateUrl: './car-detail.component.html'
})
export class CarDetailComponent implements OnInit {

  car$!: Observable<Car>;
  imageBaseUrl = 'http://159.69.122.189:8080';
  currentImageIndex = 0;

  constructor(private route: ActivatedRoute, private carService: CarService) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.currentImageIndex = 0;
    this.car$ = this.carService.getCarById(id);
  }

  periodLabel(car: Car): string {
    return car.rentalPeriod === 'MONTHLY' ? 'month' : 'day';
  }

  prevImage(car: Car) {
    const total = car.images?.length ?? 0;
    if (!total) return;
    this.currentImageIndex = (this.currentImageIndex - 1 + total) % total;
  }

  nextImage(car: Car) {
    const total = car.images?.length ?? 0;
    if (!total) return;
    this.currentImageIndex = (this.currentImageIndex + 1) % total;
  }

  goToImage(index: number) {
    this.currentImageIndex = index;
  }
}
