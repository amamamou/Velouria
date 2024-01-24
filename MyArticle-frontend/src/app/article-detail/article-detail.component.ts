import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../article.service';
import { Article } from '../article.model';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {
  article: Article | undefined;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private router: Router // Add this
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.articleService.getArticleById(id).subscribe(article => {
        console.log(article); // Debugging line
        this.article = article;
      });

    });
  }

  deleteArticle(id: string | undefined) {
    if (id && confirm("Are you sure you want to delete this article?")) {
      this.articleService.deleteArticle(id).subscribe(
        () => this.router.navigate(['/article-list']),
        error => console.error('Error deleting the article!', error)
      );
    }
  }


  getImageUrl(imagePath: string): string {
    return `http://localhost:3000/${imagePath}`;
  }

  imageError(event: ErrorEvent) {
    console.error('Image loading error:', event.error);
  }

  updateArticle(id: string | undefined) {
    if (id) {
      this.router.navigate(['/edit-article', id]);
    }
  }

}
