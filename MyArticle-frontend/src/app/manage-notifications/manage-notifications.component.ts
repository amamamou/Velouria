import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { ArticleService } from '../article.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-manage-notifications',
  templateUrl: './manage-notifications.component.html',
  styleUrls: ['./manage-notifications.component.css']
})
export class ManageNotificationsComponent implements OnInit {
  notifications: any[] = [];


  constructor(
    private route: ActivatedRoute, // Inject ActivatedRoute instead of Router
    private articleService: ArticleService,
    private adminService: AdminService,
    private router: Router // Inject Router for navigation
  ) { }

  ngOnInit(): void {
    this.getAllNotifications();
  }

  getAllNotifications(): void {
    this.adminService.getAllNotifications().subscribe(
      (response: any[]) => {
        this.notifications = response; // Assigning response directly as it's an array of notifications
      },
      (error) => {
        console.error('Error fetching notifications:', error);
        // Handle error
      }
    );
  }
  logout(): void {
    console.log('Logout method called');
    this.adminService.logoutAdmin(); // Assuming this method doesn't return an Observable
    this.router.navigate(['/login']).catch((err: any) => console.error('Navigation Error:', err));
  }
  deleteNotification(notificationId: string): void {
    // Call the admin service method to delete the notification
    this.adminService.deleteNotification(notificationId).subscribe(
      () => {
        // Notification deleted successfully, refresh the notifications list
        this.getAllNotifications();
      },
      (error) => {
        console.error('Error deleting notification:', error);
        // Handle error
      }
    );
  }
}
