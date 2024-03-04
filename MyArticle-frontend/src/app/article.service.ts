import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from './article.model'; // Adjust the path as per your file structure
import { environment } from 'src/environments/environment';
import { User } from 'src/user.model';
import { Category } from './category.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private apiUrl = environment.apiUrl;
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  reportArticle(articleId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/articles/${articleId}/report`, {});
  }


  getAllArticleComments(articleId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/api/articles/${articleId}/comments`);
  }

  getArticleLikes(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/article-likes`);
  }

  getArticleComments(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/article-comments`);
  }
  getArticlesBySearchTerm(term: string): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.apiUrl}/articles/search/${term}`);
  }



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
    console.log('khedmet');

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


  logout(): void {
    console.log('Executing logout in service');
    localStorage.clear();
  }

  // Category-related methods
  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories`);
  }

  getCategoryById(id: string): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/categories/${id}`);
  }

  createCategory(category: Category): Observable<any> {
    return this.http.post(`${this.apiUrl}/categories`, category);
  }

  updateCategory(id: string, category: Category): Observable<any> {
    return this.http.put(`${this.apiUrl}/categories/${id}`, category);
  }

  deleteCategory(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/categories/${id}`);
  }
  getArticlesByCategory(categoryId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/articles/category/${categoryId}`);
  }

}
