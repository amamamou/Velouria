import { Component, OnInit } from '@angular/core';
import { User } from 'src/user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user?: User;
  userId: string;

  constructor(private userService: UserService) {
    const storedUserId = localStorage.getItem('userId');
    this.userId = storedUserId ? storedUserId : ''; // Handle null case
  }

  ngOnInit(): void {
    if (this.userId) {
      this.userService.getUserProfile(this.userId).subscribe(
        (userData: User) => {
          this.user = userData;
        },
        error => {
          console.error('Error fetching user profile:', error);
        }
      );
    }
  }

  editProfile(): void {
    // Logic to edit profile
  }

  deleteProfile(): void {
    if (this.userId) {
      this.userService.deleteUser(this.userId).subscribe(
        response => {
          console.log('User profile deleted', response);
          // Implement logic after successful deletion, like redirecting
        },
        error => {
          console.error('Error deleting profile:', error);
        }
      );
    }
  }

  // Additional methods as needed
}
