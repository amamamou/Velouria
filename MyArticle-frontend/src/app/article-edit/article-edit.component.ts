import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../article.service';
import { Article } from '../article.model';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.css']
})
export class ArticleEditComponent implements OnInit {
  article: Article = { title: '', content: '', image: '', author: '' };
  selectedFile: File | null = null;

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      console.error('Article ID is missing');
      // Handle this error appropriately, maybe navigate back or show a message
      return;
    }

    this.articleService.getArticleById(id).subscribe({
      next: (data) => this.article = data,
      error: (err) => {
        console.error('Error fetching article:', err);
        // Handle the error appropriately
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit(): void {
    if (!this.article.title || !this.article.content || !this.article.author) {
      console.error('All fields are required');
      // Handle this error appropriately
      return;
    }

    const formData = new FormData();
    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }
    formData.append('title', this.article.title);
    formData.append('content', this.article.content);
    formData.append('author', this.article.author);

    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      console.error('Article ID is missing');
      // Handle this error appropriately
      return;
    }

    this.articleService.updateArticle(id, formData).subscribe({
      next: () => this.router.navigate(['/articles']), // Adjust the route as needed
      error: (err) => console.error('Error updating article:', err)
    });
  }
}
