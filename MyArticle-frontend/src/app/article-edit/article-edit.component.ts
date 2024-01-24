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
  article: Article = { title: '', content: '', image: '', author: '',category_id: 0 };
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
      return;
    }

    this.articleService.getArticleById(id).subscribe({
      next: (data) => this.article = data,
      error: (err) => {
        console.error('Error fetching article:', err);

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

    const formData = new FormData();
    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }
    formData.append('title', this.article.title);
    formData.append('content', this.article.content);
    formData.append('author', this.article.author);
    formData.append('category_id', this.article.category_id.toString());


    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      console.error('Article ID is missing');
      return;
    }

    this.articleService.updateArticle(id, formData).subscribe({
      next: () => this.router.navigate(['/articles']),error: (err) => console.error('Error updating article:', err)
    });
  }
}
