import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.component.html',
  styleUrls: ['./article-create.component.css']
})
export class ArticleCreateComponent {
  article = { title: '', content: '', author: '' };
  selectedFile: File | null = null;

  constructor(private articleService: ArticleService, private router: Router) {}

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

    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    this.articleService.createArticle(formData).subscribe({
      next: (result) => {
        console.log('Article Created', result);
        this.router.navigate(['/article-list']).catch(err => console.error('Navigation Error:', err));
      },
      error: (error) => {
        console.error('Error creating article', error);
      }
    });
  }
}

