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
  onRegister(): void {
    this.userService.registerUser(this.user.email, this.user.password, this.user.firstName, this.user.lastName, this.user.username)
      .subscribe(
        (response) => {
          console.log('User registration response:', response);
          if (response && response.message === 'User registered successfully') {
            // Registration was successful, redirect to the login page
            this.showRegisterForm = false;
          } else if (response && response.error) {
            console.error('User registration error:', response.error);
            this.errorMessage = response.error;
          } else {
            console.error('Invalid response from the server');
            this.errorMessage = 'Invalid response from the server';
          }
        },
        (error) => {
          console.error('User registration error:', error);
          this.errorMessage = error.message || 'An error occurred during user registration.';
        }
      );
  }


}
