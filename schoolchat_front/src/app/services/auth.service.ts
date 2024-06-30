import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private router: Router, private jwtHelper: JwtHelperService) {}

  register(email: string, socialLogin: boolean) {
    return this.http.post(`${this.apiUrl}/register`, { email, socialLogin });
  }

  completeRegistration(userId: string, username: string, realName: string, password: string) {
    return this.http.post(`${this.apiUrl}/complete-registration`, { userId, username, realName, password });
  }

  login(email: string, password: string) {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return token !== null && !this.jwtHelper.isTokenExpired(token);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}