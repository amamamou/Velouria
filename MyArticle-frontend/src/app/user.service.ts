import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000';
  private loggedInSubject = new BehaviorSubject<boolean>(false);
  loggedIn: Observable<boolean> = this.loggedInSubject.asObservable();

  constructor(private router: Router, private http: HttpClient) {}

  private setLoggedIn(value: boolean): void {
    this.loggedInSubject.next(value);
  }

  registerUser(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { email, password });
  }

  loginUser(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      map(response => {
        if (response && response.user) {
          this.setLoggedIn(true);
          return { success: true, user: response.user };
        }
        return { success: false, error: 'Invalid response from the server' };
      }),
      catchError(this.handleLoginError)
    );
  }

  checkSessionStatus(): Observable<boolean> {
    return this.http.get<any>(`${this.apiUrl}/session-check`).pipe(
      map(response => response.loggedIn),
      catchError(error => {
        console.error('Error checking session status:', error);
        return throwError('Error checking session status. Please try again.');
      })
    );
  }


  likeArticle(articleId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/like-article/${articleId}`, null).pipe(
      catchError(error => {
        if (error.status === 401) {
          console.error('Unauthorized error. Redirecting to login page.');
          // Redirect to login page
          this.router.navigate(['/login']);
        }
        console.error('Error liking the article:', error);
        return throwError('Error liking the article. Please try again.');
      })
    );
  }


  logoutUser(): void {
    this.http.post<any>(`${this.apiUrl}/logout`, {}).subscribe(() => {
      this.setLoggedIn(false);
      this.router.navigate(['/login']);
    });
  }

  private handleLoginError(error: HttpErrorResponse): Observable<never> {
    console.error('Login Error:', error);
    return throwError('Login failed. Please check your credentials and try again.');
  }
}
