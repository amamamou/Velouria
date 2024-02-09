import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from 'src/user.model';
import { Admin } from '../admin.model';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = {
    userId: 0,
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    profilePic: ''
  };
  admin: Admin = { // Initialize admin object
    adminId: 0,
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    profilePic: ''
  };
  confirmPassword = '';
  errorMessage = '';
  showRegisterForm = false;
  isUserLogin = true;
  constructor(private adminService : AdminService, private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    // Since JWT tokens are stateless, we check if a token exists and is valid
    // This could involve decoding the token and checking the expiry on the client side,
    // Or making a backend call that verifies the token's validity.
    // For simplicity, we'll just check for the presence of a token.
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['/article-list']);
    }
  }

  onAdminLogin(): void {
    this.adminService.loginAdmin(this.admin).subscribe(
      (response) => {
        console.log('Admin Login response:', response);
        if (response && response.success) {
          this.router.navigate(['/admin-dashboard']);
        } else if (response && response.error) {
          console.error('Admin Login error:', response.error);
          this.errorMessage = response.error;
        } else {
          console.error('Invalid response from the server');
          this.errorMessage = 'Invalid response from the server';
        }
      },
      (error) => {
        console.error('Admin Login error:', error);
        this.errorMessage = error.message || 'An error occurred during admin login.';
      }
    );
  }

  onUserLogin() {
    this.userService.loginUser(this.user).subscribe(
      (response) => {
        console.log('Login response:', response);
        if (response && response.success) {
          // Navigate to articles list upon successful login
          this.router.navigate(['/article-list']);
        } else if (response && response.error) {
          console.error('Login error:', response.error);
          this.errorMessage = response.error;
        } else {
          console.error('Invalid response from the server');
          this.errorMessage = 'Invalid response from the server';
        }
      },
      (error) => {
        console.error('Login error:', error);
        this.errorMessage = error.message || 'An error occurred during login.';
      }
    );
  }

  onRegister() {
    if (this.user.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    this.userService.registerUser(this.user.email, this.user.password).subscribe(
      response => {
        // After successful registration, automatically log in the user or direct them to the login page.
        // Assuming the backend also returns a token upon registration, similar to login.
        if (response && response.token) {
          localStorage.setItem('token', response.token); // Save the token
          this.router.navigate(['/article-list']); // Redirect to articles list
        } else {
          // If no token is returned, direct user to manually log in.
          this.router.navigate(['/login']);
        }
      },
      (error) => {
        console.error('Registration error:', error);
        this.errorMessage = error.message || 'An error occurred during registration.';
      }
    );
  }
}
