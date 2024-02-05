import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../article.service';
import { Article } from '../article.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css'],
})
export class ArticleDetailComponent implements OnInit {
  articleId: string | null = null;
  article: Article | undefined;

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

  likeOrRedirect(): void {
    if (this.article && this.article.id) {
      if (this.userService.isTokenValid()) {
        this.userService.likeArticle(this.article.id.toString()).subscribe(
          (response) => {
            console.log('Like response:', response);
            console.log('Article liked successfully');
          },
          (error) => {
            console.error('Error liking the article:', error);
          }
        );
      } else {
        console.error('Token is not available or expired.');
        this.redirectToLogin();
      }
    } else {
      console.error('Article not available');
    }
  }

  redirectToLogin(): void {
    console.log('Redirecting to login');
    this.router.navigate(['/login']);
  }
  private handleUnauthorizedError(): void {
    console.error('Unauthorized error. Token may be invalid or expired.');

    // Clear token and navigate to login page
    this.userService.logoutUser();
    this.router.navigate(['/login']);
  }


  onLoginSuccess(): void {
    const redirectArticleId = sessionStorage.getItem('redirectArticleId');
    if (redirectArticleId) {
      this.router.navigate(['/article-detail', redirectArticleId]);
      sessionStorage.removeItem('redirectArticleId');
    } else {
      this.router.navigate(['/']);
    }
    this.handleRedirectAfterLogin();
  }
  handleRedirectAfterLogin(): void {
    const redirectArticleId = sessionStorage.getItem('redirectArticleId');
    if (redirectArticleId) {
      this.router.navigate(['/article-detail', redirectArticleId]);
      sessionStorage.removeItem('redirectArticleId');
    } else {
      this.router.navigate(['/']);
    }
  }
  refreshArticle(articleId: string): void {
    this.loadArticle(articleId);
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

