import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from 'src/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // User registration
  registerUser(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/register/user`, user);
  }

  // User login
  loginUser(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  // Get user profile
  getUserProfile(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/profile`);
  }

  // Update user profile
  updateUserProfile(user: User): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/profile`, user);
  }

  // Logout user
  logoutUser(): void {
    // Assuming logout is just a client-side operation
    localStorage.clear();
  }

  // Delete user profile
  deleteUserProfile(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/profile`);
  }
}
