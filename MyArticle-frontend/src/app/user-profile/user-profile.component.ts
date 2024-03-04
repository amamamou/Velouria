import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ArticleService } from '../article.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  notifications: any[] = [];

  userProfile: any;
  likedArticles: any[] = [];
  showDropdown: boolean = false; // Variable to toggle dropdown visibility
  displayNotificationsModal: boolean = false; // Variable to control the display of notifications modal


  toggleDropdown() {
    this.showDropdown = !this.showDropdown; // Toggle the value
  }

  constructor(private articleService: ArticleService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.fetchUserProfile();
    this.fetchLikedArticles();
    this.getAllNotifications();


  }
  deleteNotification(notificationId: string): void {
    // Call the admin service method to delete the notification
    this.userService.deleteNotification(notificationId).subscribe(
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
  closeNotificationsModal(): void {
    // Close the notifications modal by setting the displayNotificationsModal variable to false
    this.displayNotificationsModal = false;
  }

  showNotifications(): void {
    // Toggle the display of the notifications modal
    this.displayNotificationsModal = !this.displayNotificationsModal;
    // Fetch notifications only if the modal is displayed
    if (this.displayNotificationsModal) {
      this.getAllNotifications();
    }
  }

  getAllNotifications(): void {
    this.userService.getAllNotifications().subscribe(
      (response: any[]) => {
        this.notifications = response; // Assigning response directly as it's an array of notifications
      },
      (error) => {
        console.error('Error fetching notifications:', error);
        // Handle error
      }
    );
  }

  fetchUserProfile(): void {
    this.userService.getUserProfile().subscribe(
      (data: any) => {
        this.userProfile = data.user;
      },
      (error) => {
        console.error('Error fetching user profile:', error);
      }
    );
  }
  getImageUrl(imagePath: string): string {
    return `http://localhost:3000/${imagePath}`;
  }
  imageError(event: any): void {
    // Handle the error, maybe set a default image
    console.error('Error loading image:', event);
  }
  fetchLikedArticles(): void {
    this.userService.getLikedArticles().subscribe(
      (articles: any) => {
        this.likedArticles = articles;
      },
      (error) => {
        console.error('Error fetching liked articles:', error);
      }
    );
  }
  logout(): void {
    console.log('Logout method called');
    this.articleService.logout(); // Assuming this method doesn't return an Observable
    this.router.navigate(['/login']).catch((err: any) => console.error('Navigation Error:', err));
  }

}
