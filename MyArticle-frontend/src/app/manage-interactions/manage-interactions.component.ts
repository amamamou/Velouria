import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-manage-interactions',
  templateUrl: './manage-interactions.component.html',
  styleUrls: ['./manage-interactions.component.css']
})
export class ManageInteractionsComponent implements OnInit {
  articleId: string = ''; // Initialize with an empty string
  comments: any[] = [];
  likes: any[] = [];

  constructor(
    private route: ActivatedRoute, // Inject ActivatedRoute instead of Router
    private articleService: ArticleService,
    private adminService: AdminService,
    private router: Router // Inject Router for navigation
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.articleId = params['articleId'];
      this.fetchInteractions();
    });
  }

  fetchInteractions(): void {
    this.adminService.getArticleComments(this.articleId).subscribe(
      (comments) => {
        this.comments = comments;
      },
      (error) => {
        console.error(`Error fetching comments for article ${this.articleId}:`, error);
      }
    );

    this.adminService.getArticleLikes(this.articleId).subscribe(
      (likes) => {
        this.likes = likes;
      },
      (error) => {
        console.error(`Error fetching likes for article ${this.articleId}:`, error);
      }
    );
  }

  logout(): void {
    console.log('Logout method called');
    this.adminService.logoutAdmin(); // Assuming this method doesn't return an Observable
    this.router.navigate(['/login']).catch((err: any) => console.error('Navigation Error:', err));
  }
  deleteComment(commentId: string): void {
    // Check if the admin is authenticated
    this.adminService.checkSessionStatus().subscribe(
      (loggedIn) => {
        if (loggedIn) {
          // If authenticated, prompt for confirmation before deleting
          if (confirm('Are you sure you want to delete this comment?')) {
            // If confirmed, call the service to delete the comment
            this.adminService.deleteComment(commentId).subscribe(
              () => {
                // Remove the deleted comment from the local array
                this.comments = this.comments.filter(comment => comment.id !== commentId);
                console.log('Comment deleted successfully');

                // Refresh the page
                window.location.reload();
              },
              (error) => {
                console.error('Error deleting comment:', error);
              }
            );
          }
        } else {
          console.log('Admin not logged in, redirecting to login...');
          // Redirect to login page
          this.router.navigate(['/login']);
        }
      },
      (error) => {
        console.error('Error checking admin session status:', error);
        // Redirect to login page
        this.router.navigate(['/login']);
      }
    );
  }

}
