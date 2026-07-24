import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://159.69.122.189:8080/auth';

  readonly googleLoginUrl = 'http://159.69.122.189:8083/oauth2/authorization/google';

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<any>(`${this.baseUrl}/login`, {
      email,
      password
    });
  }

  register(firstName: string, lastName: string, email: string, password: string) {
    return this.http.post<any>(`${this.baseUrl}/register`, {
      firstName,
      lastName,
      email,
      password
    });
  }

  verify(email: string, code: string) {
    return this.http.post<any>(`${this.baseUrl}/verify`, null, {
      params: { email, code }
    });
  }

  getLoggedInEmail(): string | null {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }

    try {
      const payload = token.split('.')[1];
      const decoded = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
      return decoded.sub ?? null;
    } catch {
      return null;
    }
  }
}
