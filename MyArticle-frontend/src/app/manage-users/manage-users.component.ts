import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { ArticleService } from '../article.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  users: any[] = [];

  constructor(private router: Router,private articleService: ArticleService, private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (error) => {
        console.error('There was an error fetching the users', error);
      }
    });
  }
  deleteUser(userId: string): void {
    // Check if the admin is authenticated
    this.adminService.checkSessionStatus().subscribe(
      (loggedIn) => {
        if (loggedIn) {
          // If authenticated, prompt for confirmation before deleting
          if (confirm('Are you sure you want to delete this user?')) {
            // If confirmed, call the service to delete the user
            this.adminService.deleteUser(userId).subscribe(
              () => {
                // Remove the deleted user from the local array
                this.users = this.users.filter(user => user.id !== userId);
                console.log('User deleted successfully');
              },
              (error) => {
                console.error('Error deleting user:', error);
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
        // Redirect to login page as a fallback
        this.router.navigate(['/login']);
      }
    );
  }
  logout(): void {
    console.log('Logout method called');
    this.adminService.logoutAdmin(); // Assuming this method doesn't return an Observable
    this.router.navigate(['/login']).catch((err: any) => console.error('Navigation Error:', err));
  }
}
