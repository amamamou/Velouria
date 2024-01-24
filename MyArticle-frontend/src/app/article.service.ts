import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from './article.model'; // Adjust the path as per your file structure
import { environment } from 'src/environments/environment';
import { User } from 'src/user.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  createArticle(articleData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/articles`, articleData);
  }


  getAllArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.apiUrl}/articles`);
  }

  getArticleById(id: string): Observable<Article> {
    return this.http.get<Article>(`${this.apiUrl}/articles/${id}`);
  }

  updateArticle(id: string, formData: FormData): Observable<Article> {
    return this.http.put<Article>(`${this.apiUrl}/articles/${id}`, formData);
  }

  deleteArticle(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/articles/${id}`);
  }
  //login
  loginUser(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login/user`, { email, password });
  }

  loginAdmin(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login/admin`, { email, password });
  }
  //register
  registerUser(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/register/user`, user);
  }
  //logout
  // In article.service.ts

logout(): void {
  localStorage.clear(); // This will clear all local storage data
}

}
