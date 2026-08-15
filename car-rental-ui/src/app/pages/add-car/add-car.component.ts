import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { CarService } from '../../core/car.service';
import { Currency, FuelType, RentalPeriod, SellerType, SteeringWheel } from '../../core/car.model';
import { ARMENIA_REGIONS, ArmeniaRegion, buildLocation } from '../../core/armenia-locations';
import { LogoComponent } from '../../shared/logo/logo.component';

@Component({
  selector: 'app-add-car',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, LogoComponent],
  templateUrl: './add-car.component.html'
})
export class AddCarComponent {

  regions = ARMENIA_REGIONS;

  brand = '';
  model = '';
  year: number | null = null;
  price: number | null = null;
  vin = '';
  description = '';
  rentalPeriod: RentalPeriod = 'DAILY';
  currency: Currency = 'USD';
  fuelType: FuelType = 'PETROL';

  sellerType: SellerType = 'OWNER';
  phoneNumber = '';
  region = '';
  district = '';
  mileage: number | null = null;
  currentCondition = '';
  gasEquipment = false;
  steeringWheel: SteeringWheel = 'LEFT';
  clearedCustoms = false;
  exchangePossible = false;
  color = '';
  wheelSize: number | null = null;
  headlights = '';
  interiorColor = '';
  interiorMaterial = '';
  sunroof = false;
  comfort = '';

  images: File[] = [];

  constructor(private carService: CarService, private router: Router) {}

  get selectedRegion(): ArmeniaRegion | undefined {
    return this.regions.find(r => r.name === this.region);
  }

  onRegionChange() {
    this.district = '';
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    this.images = input.files ? Array.from(input.files) : [];
  }

  onSubmit() {
    if (!this.vin.trim()) {
      alert('VIN is required');
      return;
    }

    if (!this.region) {
      alert('Please select a location');
      return;
    }

    if (this.year === null || this.price === null) {
      alert('Please fill in all fields');
      return;
    }

    if (!this.phoneNumber.trim()) {
      alert('Phone number is required');
      return;
    }

    if (this.images.length < 5) {
      alert('Please select at least 5 images');
      return;
    }

    this.carService.addCar({
      brand: this.brand,
      model: this.model,
      year: this.year,
      price: this.price,
      rentalPeriod: this.rentalPeriod,
      currency: this.currency,
      fuelType: this.fuelType,
      description: this.description,
      vin: this.vin.trim(),
      sellerType: this.sellerType,
      phoneNumber: this.phoneNumber.trim(),
      location: buildLocation(this.region, this.district || null),
      mileage: this.mileage ?? undefined,
      currentCondition: this.currentCondition,
      gasEquipment: this.gasEquipment,
      steeringWheel: this.steeringWheel,
      clearedCustoms: this.clearedCustoms,
      exchangePossible: this.exchangePossible,
      color: this.color,
      wheelSize: this.wheelSize ?? undefined,
      headlights: this.headlights,
      interiorColor: this.interiorColor,
      interiorMaterial: this.interiorMaterial,
      sunroof: this.sunroof,
      comfort: this.comfort
    }, this.images).subscribe({
      next: () => this.router.navigate(['/cars']),
      error: (err) => {
        alert(err?.error?.message || 'Failed to add car');
      }
    });
  }
}
