import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000';
  private loggedInSubject = new BehaviorSubject<boolean>(false);
  loggedIn: Observable<boolean> = this.loggedInSubject.asObservable();
  private userId: string | undefined;


  constructor(private router: Router, private http: HttpClient) {}
   // Method to fetch liked articles for the authenticated user
   getLikedArticles(): Observable<any> {
    const url = `${this.apiUrl}/liked-articles`;
    const headers = this.getHeaders();
    return this.http.get<any>(url, { headers }).pipe(
      map(response => response.likedArticles),
      catchError(error => {
        if (error.status === 401) {
          console.error('Unauthorized error. Redirecting to login page.');
          this.router.navigate(['/login']);
        }
        console.error('Error fetching liked articles:', error);
        return throwError('Error fetching liked articles. Please try again.');
      })
    );
  }


  getUserProfile(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/profile`, { headers: this.getHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          console.error('Unauthorized error. Redirecting to login page.');
          // Redirect to login page
          this.router.navigate(['/login']);
        }
        console.error('Error getting user profile:', error);
        return throwError('Error getting user profile. Please try again.');
      })
    );
  }


  addComment(articleId: string, commentText: string): Observable<any> {
    // Prepare the request body
    const requestBody = {
      commentText: commentText
    };
    // Make the HTTP POST request to the add-comment endpoint
      return this.http.post<any>(`${this.apiUrl}/add-comment/${articleId}`, requestBody, { headers: this.getHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          console.error('Unauthorized error. Redirecting to login page.');
          // Redirect to login page
          this.router.navigate(['/login']);
        }
        console.error('Error adding the comment:', error);
        return throwError('Error adding the comment. Please try again.');
      })
    );
  }
  likeArticle(articleId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/like-article/${articleId}`, null, { headers: this.getHeaders() }).pipe(
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

  setUserId(userId: string): void {
    this.userId = userId;
  }

  getUserId(): string | undefined {
    return this.userId;
  }

 // UserService
checkIfUserLikedArticle(articleId: string): Observable<boolean> {
  const userId = this.getUserId(); // Get the user ID of the authenticated user internally
  return this.http.get<boolean>(`${this.apiUrl}/check-like/${userId}/${articleId}`).pipe(
    catchError(error => {
      console.error('Error checking if user liked the article:', error);
      return of(false); // Return false or handle as appropriate
    })
  );
}


  private setLoggedIn(value: boolean): void {
    this.loggedInSubject.next(value);
  }

  registerUser(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { email, password });
  }

  loginUser(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      map(response => {
        if (response && response.token) {
          localStorage.setItem('token', response.token); // Store JWT token in local storage
          this.setUserId(response.userId); // Save userId in UserService

          this.setLoggedIn(true);
          return { success: true, user: response.user };
        }
        return { success: false, error: 'Invalid response from the server' };
      }),
      catchError(this.handleLoginError)
    );
  }

  checkSessionStatus(): Observable<boolean> {
    // Assuming JWT tokens are stateless, you can directly check if the token exists in local storage
    const token = localStorage.getItem('token');
    return token ? this.http.get<any>(`${this.apiUrl}/session-check`, { headers: { Authorization: `Bearer ${token}` } }).pipe(
      map(response => response.loggedIn),
      catchError(error => {
        console.error('Error checking session status:', error);
        return throwError('Error checking session status. Please try again.');
      })
    ) : throwError('Token not found in local storage');
  }




  logoutUser(): void {
    localStorage.removeItem('token'); // Remove JWT token from local storage
    this.setLoggedIn(false);
    this.router.navigate(['/login']);
  }

  private handleLoginError(error: HttpErrorResponse): Observable<never> {
    console.error('Login Error:', error);
    return throwError('Login failed. Please check your credentials and try again.');
  }

  private getHeaders(): { [header: string]: string | string[] } {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
}
