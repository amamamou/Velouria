import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from '../article.service';
import { Article } from '../article.model';  // Make sure this is correctly imported
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.component.html',
  styleUrls: ['./article-create.component.css']
})
export class ArticleCreateComponent {
  // Update your article object here
  article: Article = { title: '', content: '', author: '', image: '', category_id: 0 };
  selectedFile: File | null = null;

  constructor(private adminService: AdminService, private articleService: ArticleService, private router: Router) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('title', this.article.title);
    formData.append('content', this.article.content);
    formData.append('author', this.article.author);
    formData.append('category_id', this.article.category_id.toString()); // Add category_id to formData

    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    this.articleService.createArticle(formData).subscribe({
      next: (result) => {
        console.log('Article Created', result);
        this.router.navigate(['/manage-articles']).catch(err => console.error('Navigation Error:', err));
      },
      error: (error) => {
        console.error('Error creating article', error);
      }
    });
  }
  logout(): void {
    console.log('Logout method called');
    this.adminService.logoutAdmin(); // Assuming this method doesn't return an Observable
    this.router.navigate(['/login']).catch((err: any) => console.error('Navigation Error:', err));
  }
}
