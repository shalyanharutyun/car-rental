import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type PaymentMethod = 'CARD' | 'CASH';

export interface Booking {
  id?: number;
  carId: number;
  carName?: string;
  startDate: string;
  endDate: string;
  totalPrice?: number;
  currency?: string;
  paymentMethod?: PaymentMethod;
  status?: 'PENDING' | 'CONFIRMED' | 'FAILED';
}

export interface NewBooking {
  carId: number;
  startDate: string;
  endDate: string;
  paymentMethod: PaymentMethod;
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private baseUrl = 'http://localhost:8080/bookings';

  constructor(private http: HttpClient) {}

  createBooking(booking: NewBooking): Observable<Booking> {
    return this.http.post<Booking>(this.baseUrl, booking);
  }

  getMyBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.baseUrl}/mine`);
  }
}