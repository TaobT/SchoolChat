import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

interface User {
  userId: string;
  username: string;
  realName: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl + '/api/auth/user';

  constructor(private http: HttpClient) {}

  getUser(): Observable<User> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    const headers = new HttpHeaders().set('authorization', `Bearer ${token}`);
    return this.http.get<User>(this.apiUrl, { headers });
  }
}
