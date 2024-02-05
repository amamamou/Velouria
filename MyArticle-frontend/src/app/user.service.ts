import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, EMPTY, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000';
  private loggedInSubject = new BehaviorSubject<boolean>(false);
  loggedIn: Observable<boolean> = this.loggedInSubject.asObservable();

  constructor(private router : Router , private http: HttpClient) {}

  private setLoggedIn(value: boolean): void {
    this.loggedInSubject.next(value);
  }
  setLoggedInValue(value: boolean): void {
    this.loggedInSubject.next(value);
  }
setTokenPublic(token: string): void {
  this.setToken(token);
}
getLoggedInValue(): boolean {
  return this.loggedInSubject.value;
}


  private handleUnauthorizedError(): void {
    console.error('Unauthorized error. Token may be invalid or expired.');

    // Clear token and navigate to login page
    this.logoutUser();
    // Redirect to login if needed
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

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Handle Error:', error);
    if (error.status === 401) {
      this.handleUnauthorizedError();
    }
    return throwError('Something went wrong. Please try again.');
  }

  private handleLoginError(error: HttpErrorResponse): Observable<never> {
    console.error('Login Error:', error);
    return throwError('Login failed. Please check your credentials and try again.');
  }
  registerUser(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { email, password });
  }


  private decodeToken(token: string): any | null {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isTokenValid(): boolean {
    const token = this.getToken();
    if (!token) {
      console.error('Token is not available.');
      return false;
    }

    const decoded = this.decodeToken(token);
    if (!decoded || !decoded.exp) {
      console.error('Failed to decode token or token does not have an expiration claim.');
      return false;
    }

    const isExpired = Date.now() / 1000 >= decoded.exp;
    if (isExpired) {
      console.error('Token is expired.');
      return false;
    }

    console.log('Token is valid.');
    return true;
  }

  loginUser(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      map(response => {
        if (response && response.user && response.user.token) {
          const token = response.user.token.trim();
          if (token) {
            this.setToken(token);
            this.setLoggedIn(true);
            return { success: true, user: response.user };
          }
        }
        return { success: false, error: 'Invalid response from the server' };
      }),
      catchError(this.handleLoginError)
    );
  }

  likeArticle(articleId: string): Observable<any> {
    if (this.isTokenValid()) {
      const headers = this.getHeadersWithAuthorization();
      return this.http.post(`http://localhost:3000/like/${articleId}`, null, { headers });
    } else {
      // Handle the case when the token is not valid or not available
      console.error('Token is not available or expired.');
      // You can redirect to the login page or handle it as per your requirement
      // For example, redirecting to the login page:
      this.router.navigate(['/login']);
      return EMPTY; // Return an observable or use EMPTY to handle the error in the component
    }
  }


  logoutUser(): void {
    localStorage.removeItem('token');
    this.setLoggedIn(false);
  }

  private setToken(token: string): void {
    localStorage.setItem('token', token);
  }
}
