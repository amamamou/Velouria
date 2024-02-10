import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:3000';
  private loggedInSubject = new BehaviorSubject<boolean>(false);
  loggedIn: Observable<boolean> = this.loggedInSubject.asObservable();
  private adminId: string | undefined;

  constructor(private router: Router, private http: HttpClient) {}
  getAllNotifications(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/notifications`);
  }
  deleteNotification(notificationId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/notifications/${notificationId}`, { headers: this.getHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          console.error('Unauthorized error. Redirecting to login page.');
          this.router.navigate(['/login']);
        }
        console.error('Error deleting the notification:', error);
        return throwError('Error deleting the notification. Please try again.');
      })
    );
  }

  deleteComment(commentId: string): Observable<any> {
    const url = `${this.apiUrl}/comments/${commentId}`;
    const headers = this.getHeaders();
    return this.http.delete<any>(url, { headers }).pipe(
      catchError(error => {
        if (error.status === 401) {
          console.error('Unauthorized error. Redirecting to login page.');
          this.router.navigate(['/login']);
        }
        console.error('Error deleting the comment:', error);
        return throwError('Error deleting the comment. Please try again.');
      })
    );
  }


  getArticleComments(articleId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/articles/${articleId}/comments`);
  }

  getArticleLikes(articleId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/articles/${articleId}/likes`);
  }
  deleteCategory(categoryId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/categories/${categoryId}`, { headers: this.getHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          console.error('Unauthorized error. Redirecting to login page.');
          this.router.navigate(['/login']);
        }
        console.error('Error deleting the category:', error);
        return throwError('Error deleting the category. Please try again.');
      })
    );
  }

  // Method to delete a user by ID
  deleteUser(userId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/users/${userId}`, { headers: this.getHeaders() }).pipe(
      catchError(error => {
        console.error('Error deleting user:', error);
        return throwError('Error deleting user. Please try again.');
      })
    );
  }
   // Method to delete an article by ID
   deleteArticle(articleId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/articles/${articleId}`, { headers: this.getHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          console.error('Unauthorized error. Redirecting to login page.');
          this.router.navigate(['/login']);
        }
        console.error('Error deleting the article:', error);
        return throwError('Error deleting the article. Please try again.');
      })
    );
  }
  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/categories`);
  }
  getAllArticles(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/articles`).pipe(
      catchError(error => {
        console.error('Error fetching articles:', error);
        return throwError(() => new Error('Error fetching articles. Please try again.'));
      })
    );
  }
  // Method to fetch all users
getAllUsers(): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/users`).pipe(
    catchError(error => {
      console.error('Error fetching users:', error);
      return throwError('Error fetching users. Please try again.');
    })
  );
}

  getArticlePopularity(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/article-popularity`).pipe(
      catchError(error => {
        console.error('Error fetching article popularity:', error);
        return throwError('Error fetching article popularity. Please try again.');
      })
    );
  }

  // Method to fetch liked articles for the authenticated admin
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


  // Method to add comment as admin
  addComment(articleId: string, commentText: string): Observable<any> {
    const requestBody = {
      commentText: commentText
    };
    return this.http.post<any>(`${this.apiUrl}/add-comment/${articleId}`, requestBody, { headers: this.getHeaders() }).pipe(
      catchError(error => {
        if (error.status === 401) {
          console.error('Unauthorized error. Redirecting to login page.');
          this.router.navigate(['/login']);
        }
        console.error('Error adding the comment:', error);
        return throwError('Error adding the comment. Please try again.');
      })
    );
  }

  // Method to set admin id
  setAdminId(adminId: string): void {
    this.adminId = adminId;
  }

  // Method to get admin id
  getAdminId(): string | undefined {
    return this.adminId;
  }

  // Method to set logged in status
  private setLoggedIn(value: boolean): void {
    this.loggedInSubject.next(value);
  }

  // Method to login admin
  loginAdmin(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login-admin`, credentials).pipe(
      map(response => {
        if (response && response.token) {
          localStorage.setItem('adminToken', response.token);
          this.setAdminId(response.adminId);
          this.setLoggedIn(true);
          return { success: true, admin: response.admin };
        }
        return { success: false, error: 'Invalid response from the server' };
      }),
      catchError(this.handleLoginError)
    );
  }

  // Method to check session status
  checkSessionStatus(): Observable<boolean> {
    const token = localStorage.getItem('adminToken');
    return token ? this.http.get<any>(`${this.apiUrl}/admin-profile`, { headers: { Authorization: `Bearer ${token}` } }).pipe(
      map(response => response.loggedIn),
      catchError(error => {
        console.error('Error checking session status:', error);
        return throwError('Error checking session status. Please try again.');
      })
    ) : throwError('Token not found in local storage');
  }

  // Method to logout admin
  logoutAdmin(): void {
    localStorage.removeItem('adminToken');
    this.setLoggedIn(false);
    this.router.navigate(['/login']);
  }

  // Method to handle login error
  private handleLoginError(error: HttpErrorResponse): Observable<never> {
    console.error('Login Error:', error);
    return throwError('Login failed. Please check your credentials and try again.');
  }

  // Method to get headers
  private getHeaders(): { [header: string]: string | string[] } {
    const token = localStorage.getItem('adminToken');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
}
