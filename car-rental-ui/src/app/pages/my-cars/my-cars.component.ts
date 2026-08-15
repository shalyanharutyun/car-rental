import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { CarService } from '../../core/car.service';
import { Car } from '../../core/car.model';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ThemeToggleComponent } from '../../shared/theme-toggle/theme-toggle.component';
import { LangSwitcherComponent } from '../../shared/lang-switcher/lang-switcher.component';
import { AccountMenuComponent } from '../../shared/account-menu/account-menu.component';
import { LogoComponent } from '../../shared/logo/logo.component';

@Component({
  selector: 'app-my-cars',
  standalone: true,
  imports: [CommonModule, RouterLink, ThemeToggleComponent, LangSwitcherComponent, AccountMenuComponent, LogoComponent, TranslatePipe],
  templateUrl: './my-cars.component.html'
})
export class MyCarsComponent implements OnInit {

  cars$!: Observable<Car[]>;
  imageBaseUrl = 'http://159.69.122.189:8080';

  constructor(private carService: CarService, private cdr: ChangeDetectorRef, private translate: TranslateService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.cars$ = this.carService.getMyCars();
  }

  periodLabel(car: Car): string {
    return car.rentalPeriod === 'MONTHLY' ? 'month' : 'day';
  }

  deleteCar(car: Car, event: Event) {
    event.stopPropagation();
    if (!car.id || !confirm(this.translate.instant('myCars.confirmDelete'))) {
      return;
    }

    this.carService.deleteCar(car.id).subscribe({
      next: () => { this.load(); this.cdr.markForCheck(); },
      error: () => alert(this.translate.instant('myCars.deleteFailed'))
    });
  }
}
