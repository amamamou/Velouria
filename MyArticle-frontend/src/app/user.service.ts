// user.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from 'src/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private apiUrl = environment.apiUrl;
  private usersApiUrl = 'http://localhost:3000/users';
  private loggedInSubject = new BehaviorSubject<boolean>(false);
  loggedIn: Observable<boolean> = this.loggedInSubject.asObservable();

  constructor(private router: Router, private http: HttpClient) {
    this.checkLoginStatus();
  }



public handleUnauthorizedError(): void {
  console.error('Unauthorized error. Token may be invalid or expired.');

  this.router.navigate(['/login']);
}


  private getHeadersWithAuthorization(): HttpHeaders {
    const token = this.getToken();
    if (!token) {
      throw new Error('Token not available. Please log in.');
    }
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 401) {
      this.handleUnauthorizedError();
      return throwError('Authentication failed. Please log in again.');
    } else {
      return throwError(error.message || 'Server error');
    }
  }

likeArticle(articleId: number, token: string): Observable<any> {
  const url = `${this.apiUrl}/like/${articleId}`;

  const headers = this.getHeadersWithAuthorization();

  return this.http.post(url, {}, { headers }).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('Error liking the article:', error);
      return throwError(error);
    })
  );
}


  checkAuthentication(): Observable<any> {
    const jwtToken = this.getToken();
    const isAuthenticated = !!jwtToken;
    this.setAuthenticated(isAuthenticated);
    return of({ authenticated: isAuthenticated });
  }

  checkLoginStatus() {
    const token = this.getTokenFromStorage();
    this.setAuthenticated(!!token);
  }


  loginUser(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials, { withCredentials: true }).pipe(
      map(response => {
        if (response && response.token) {
          this.setToken(response.token);
          this.setLoggedIn(true);
          return response;
        } else {
          return { error: 'Invalid response from the server' };
        }
      }),
      catchError(this.handleLoginError)
    );
  }

  private handleLoginError(error: HttpErrorResponse) {
    console.error('Login error:', error);
    return throwError('Login failed. Please check your credentials and try again.');
  }






  private getTokenFromStorage(): string | null {
    return localStorage.getItem('token');
  }



  logoutUser() {
    localStorage.removeItem('token');
    this.setAuthenticated(false);
  }

  get isAuthenticatedValue(): boolean {
    return !!this.getTokenFromStorage();
  }

  hasPermission(permission: string): boolean {
    return this.isAuthenticatedValue && this.checkPermissionInSession(permission);
  }

  private checkPermissionInSession(permission: string): boolean {
    const userPermissions = JSON.parse(sessionStorage.getItem('userPermissions') || '[]');
    return userPermissions.includes(permission);
  }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }


  registerUser(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { email, password });
  }


  setAuthenticated(status: boolean): void {
    this.isAuthenticatedSubject.next(status);
  }

  setLoggedIn(value: boolean): void {
    this.loggedInSubject.next(value);
  }




  updateUserProfile(updatedProfile: any): Observable<any> {
    return this.http.put(`${this.usersApiUrl}/profile`, updatedProfile);
  }

  deleteUserAccount(): Observable<any> {
    return this.http.delete(`${this.usersApiUrl}/profile`);
  }

  getLoggedInValue(): boolean {
    return this.loggedInSubject.getValue();
  }

  public getUserProfile(): Observable<User> {
    const url = 'http://localhost:3000/users/profile';
    const token = this.getToken();

    if (!token) {
      this.handleUnauthorizedError();
      return throwError({ error: 'Token not available' });
    }

    const headers = this.getHeadersWithAuthorization();

    console.log('Token sent in headers:', token);

    return this.http.get<User>(url, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('Error response from server:', error);

        if (error.status === 401) {
          this.handleUnauthorizedError();
        }
        return throwError(error);
      })
    );
  }


  private setSession(userData: any): void {
    sessionStorage.setItem('userData', JSON.stringify(userData));
  }

  private clearSession(): void {
    sessionStorage.removeItem('userData');
  }
}
