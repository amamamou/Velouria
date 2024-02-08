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
  articleLikes: { [key: number]: number } = {};
  articleComments: { [key: number]: number } = {};
  showCommentContainer = false;
  userLikedArticle = false; // Add this property to track if the user liked the article
  newCommentText: string = ''; // Property to bind to the input field


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

      } else {
        console.error('Article ID is undefined.');
      }
    });
  }

  addComment(): void {
    this.userService.checkSessionStatus().subscribe(
      (loggedIn) => {
        if (loggedIn) {
          // Ensure articleId is available and newCommentText is not empty
          if (this.article && this.articleId && this.newCommentText.trim()) {
            // Call the service to add the comment
            this.userService.addComment(this.articleId, this.newCommentText).subscribe(
              (response) => {
                console.log('Comment response:', response);
                console.log('Comment added successfully');
                if (this.articleId) {
                  this.getAllArticleComments(+this.articleId); // Convert string to number and ensure it's not null
                } else {
                  console.error('Article ID is null or undefined.');
                }
                this.loadArticleComments(); // Refresh article likes after liking

                this.newCommentText = '';
              },
              (error) => {
                console.error('Error adding the comment:', error);
                // Check error status and handle accordingly
                if (error.status === 401) {
                  console.log('User not logged in');
                  // Redirect to login page
                  this.redirectToLogin();
                } else {
                  // Handle other errors if needed
                }
              }
            );
          } else {
            console.error('Article not available or comment text is empty');
          }
        } else {
          console.log('User not logged in, redirecting to login...');
          // Redirect to login page
          this.redirectToLogin();
        }
      },
      (error) => {
        console.error('Error checking session status:', error);
        // Redirect to login page
        this.redirectToLogin();
      }
    );
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
    this.userService.checkSessionStatus().subscribe(
      (loggedIn) => {
        if (loggedIn) {
          if (this.article && this.article.id) {
            this.userService.likeArticle(this.article.id.toString()).subscribe(
              (response) => {
                console.log('Like response:', response);
                console.log('Article liked successfully');
                this.loadArticleLikes(); // Refresh article likes after liking

              },
              (error) => {
                console.error('Error liking the article:', error);
                console.log('Error status:', error.status);
                console.log('Error message:', error.message);
                console.log('Error body:', error.error);
                if (error.status === 401) {
                  console.log('User not logged in');
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
          console.log('User not logged in, redirecting to login...');
          this.redirectToLogin();
        }
      },
      (error) => {
        console.error('Error checking session status:', error);
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
      (comments: Comment[] | any) => {
        if (Array.isArray(comments)) {
          this.articleCommentss = comments.map(comment => ({
            ...comment,
            username: comment.username,
            text: comment.comment_text
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
