// article-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../article.service';
import { Article } from '../article.model';
import { UserService } from '../user.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css'],
})
export class ArticleDetailComponent implements OnInit {
  articleId: string | null = null;
  isLoggedIn: boolean = false;
  article: Article | undefined;
  articleIdForRedirect: string | undefined; // Add this line
  token: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.articleId = params['id'];
      if (this.articleId) {
        this.loadArticle(this.articleId);
      }
    });
    this.token = this.userService.getToken();

  }

  loadArticle(articleId: string): void {
    this.articleService.getArticleById(articleId).subscribe(
      (article) => {
        this.article = article;
        console.log(article);
      },
      (error) => {
        console.error('Error loading article:', error);
      }
    );
  }

  // ArticleDetailComponent.ts
// ArticleDetailComponent.ts
// ArticleDetailComponent.ts
// Example code in article-detail.component.ts
likeOrRedirect(): void {
  if (this.article && this.article.id && this.token) {
    const articleId = +this.article.id; // Convert to number
    this.userService.likeArticle(articleId, this.token).subscribe(
      () => {
        // Handle successful like
      },
      (error) => {
        if (error.status === 401) {
          // Handle unauthorized error
          this.userService.handleUnauthorizedError();
        } else {
          // Handle other errors
          console.error('Error liking the article:', error);
        }
      }
    );
  } else {
    // Handle the case where either articleId or token is not available
    console.error('Article or token not available');
  }
}






redirectToLogin(articleId: string): void {
  console.log('Redirecting to login');
  this.articleIdForRedirect = articleId;
  this.router.navigate(['/login']);
}


  // Additional methods...

  onLoginSuccess(): void {
    const redirectArticleId = sessionStorage.getItem('redirectArticleId');
    if (redirectArticleId) {
      this.router.navigate(['/article-detail', redirectArticleId]);
      sessionStorage.removeItem('redirectArticleId');
    } else {
      this.router.navigate(['/']);
    }

    // Call handleRedirectAfterLogin to clear articleIdForRedirect
    this.handleRedirectAfterLogin();
  }


  refreshArticle(articleId: string): void {
    this.loadArticle(articleId);
  }

  handleRedirectAfterLogin(): void {
    if (this.articleIdForRedirect) {
      this.router.navigate(['/article-detail', this.articleIdForRedirect]);
      this.articleIdForRedirect = undefined;
    }
  }

  getImageUrl(imagePath: string): string {
    return `http://localhost:3000/${imagePath}`;
  }

  imageError(event: any): void {
    console.error('Error loading image:', event);
  }

  updateArticle(id: string | undefined) {
    if (id) {
      this.router.navigate(['/edit-article', id]);
    }
  }

  deleteArticle(id: string | undefined) {
    if (id && confirm('Are you sure you want to delete this article?')) {
      this.articleService.deleteArticle(id).subscribe(
        () => this.router.navigate(['/article-list']),
        (error) => console.error('Error deleting the article!', error)
      );
    }
  }
}
