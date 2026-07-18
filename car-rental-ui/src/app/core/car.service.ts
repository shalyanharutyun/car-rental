import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car, Page } from './car.model';

export type NewCar = Omit<Car, 'id' | 'images' | 'available' | 'ownerEmail'>;

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private baseUrl = 'http://localhost:8080/cars';

  constructor(private http: HttpClient) {}

  getCars(page = 0, size = 12, yearFrom?: number | null, yearTo?: number | null, location?: string | null): Observable<Page<Car>> {
    const params: Record<string, string | number> = { page, size };
    if (yearFrom) {
      params['yearFrom'] = yearFrom;
    }
    if (yearTo) {
      params['yearTo'] = yearTo;
    }
    if (location) {
      params['location'] = location;
    }
    return this.http.get<Page<Car>>(this.baseUrl, { params });
  }

  getMyCars(): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.baseUrl}/mine`);
  }

  getCarById(id: number): Observable<Car> {
    return this.http.get<Car>(`${this.baseUrl}/${id}`);
  }

  addCar(car: NewCar, images: File[]): Observable<Car> {
    const formData = new FormData();
    formData.append('car', new Blob([JSON.stringify(car)], { type: 'application/json' }));
    images.forEach(image => formData.append('images', image));

    return this.http.post<Car>(this.baseUrl, formData);
  }

  deleteCar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
