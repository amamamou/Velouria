import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../article.service';
import { Article } from '../article.model';
import { UserService } from '../user.service';
import { Comment } from '../comment.model';


@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css'],
})
export class ArticleDetailComponent implements OnInit {
  articleId: string | null = null;
  article: Article | undefined;
  articleCommentss: Comment[] = [];
  articleLikes: { [key: number]: number } = {}; // Define articleLikes with type
  articleComments: { [key: number]: number } = {}; // Define articleComments with type
  showCommentContainer = false;

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
        this.loadArticleLikes();
        this.loadArticleComments();
        this.getAllArticleComments(+this.articleId);

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
    // Check the user's session status before attempting to like the article
    this.userService.checkSessionStatus().subscribe(
      (loggedIn) => {
        if (loggedIn) {
          // If the user is logged in, proceed with liking the article
          if (this.article && this.article.id) {
            this.userService.likeArticle(this.article.id.toString()).subscribe(
              (response) => {
                console.log('Like response:', response);
                console.log('Article liked successfully');
              },
              (error) => {
                console.error('Error liking the article:', error);
                console.log('Error status:', error.status);
                console.log('Error message:', error.message);
                console.log('Error body:', error.error);
                // Handle authentication error
                if (error.status === 401) {
                  console.log('User not logged in');
                  // Since the user was logged in when the session check was performed,
                  // this scenario should not occur. It's an unexpected situation.
                  // Redirecting to login just as a fallback mechanism.
                  this.redirectToLogin();
                } else {
                  // Handle other errors if needed
                }
              }
            );
          } else {
            console.error('Article not available');
          }
        } else {
          // If the user is not logged in, redirect to the login page
          console.log('User not logged in, redirecting to login...');
          this.redirectToLogin();
        }
      },
      (error) => {
        console.error('Error checking session status:', error);
        // Handle error while checking session status
        // You can choose to redirect to login or handle it differently based on your application logic
        this.redirectToLogin();
      }
    );
  }

  redirectToLogin(): void {
    console.log('Redirecting to login');
    this.router.navigate(['/login']);
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
  loadArticleLikes(): void {
    this.articleService.getArticleLikes().subscribe(
      likes => {
        this.articleLikes = {};
        likes.forEach((like: any) => {
          this.articleLikes[like.article_id] = like.like_count;
        });
        console.log('Article likes:', this.articleLikes);
      },
      error => {
        console.error('Error loading article likes:', error);
      }
    );
  }

  loadArticleComments(): void {
    this.articleService.getArticleComments().subscribe(
      comments => {
        this.articleComments = {};
        comments.forEach((comment: any) => {
          this.articleComments[comment.article_id] = comment.comment_count;
        });
        console.log('Article comments:', this.articleComments);
      },
      error => {
        console.error('Error loading article comments:', error);
      }
    );
  }


  getAllArticleComments(articleId: number): void {
    this.articleService.getAllArticleComments(articleId).subscribe(
      (comments: Comment[] | any) => { // Adjust the type to accept any
        if (Array.isArray(comments)) { // Check if comments is an array
          this.articleCommentss = comments.map(comment => ({
            ...comment,
            username: comment.username, // Ensure username is present in the Comment interface
            text: comment.comment_text // Ensure text is present in the Comment interface
          }));
        } else {
          console.error('Error loading article comments:', comments);
        }
      },
      (error) => {
        console.error('Error loading article comments:', error);
      }
    );
  }
  toggleCommentContainer(): void {
    this.showCommentContainer = !this.showCommentContainer;
  }


}
