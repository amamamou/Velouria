import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { ArticleService } from '../article.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-categories',
  templateUrl: './manage-categories.component.html',
  styleUrls: ['./manage-categories.component.css']
})
export class ManageCategoriesComponent implements OnInit {
  categories: any[] = [];

  constructor(private router: Router,private articleService: ArticleService, private adminService: AdminService) { }

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories(): void {
    this.adminService.getCategories().subscribe(
      (data) => {
        this.categories = data;
        console.log('Categories:', this.categories);
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }
  logout(): void {
    console.log('Logout method called');
    this.adminService.logoutAdmin(); // Assuming this method doesn't return an Observable
    this.router.navigate(['/login']).catch((err: any) => console.error('Navigation Error:', err));
  }
  deleteCategory(categoryId: string): void {
    // Check if the admin is authenticated
    this.adminService.checkSessionStatus().subscribe(
      (loggedIn) => {
        if (loggedIn) {
          // If authenticated, prompt for confirmation before deleting
          if (confirm('Are you sure you want to delete this category?')) {
            // If confirmed, call the service to delete the category
            this.adminService.deleteCategory(categoryId).subscribe(
              () => {
                // Remove the deleted category from the local array
                this.categories = this.categories.filter(category => category.id !== categoryId);
                console.log('Category deleted successfully');

                // Optionally, refresh the page by navigating back to the same component's route
                // This step might be necessary or useful depending on your app's structure and user experience design
                this.router.navigateByUrl('/manage-categories', { skipLocationChange: true }).then(() => {
                  this.router.navigate(['/manage-categories']);
                });
              },
              (error) => {
                console.error('Error deleting category:', error);
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

}
