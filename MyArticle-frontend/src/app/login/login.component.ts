import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from 'src/user.model';

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

  confirmPassword = '';
  errorMessage = '';
  showRegisterForm = false;
  isUserLogin = true;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    // Check session status when the component initializes
    this.userService.checkSessionStatus().subscribe(
      loggedIn => {
        if (loggedIn) {
          // User is already logged in, redirect to article list
          this.router.navigate(['/article-list']);
        }
      },
      error => {
        console.error('Error checking session status:', error);
        this.errorMessage = 'An error occurred while checking session status.';
      }
    );
  }

  onUserLogin() {
    this.userService.loginUser(this.user).subscribe(
      (response) => {
        console.log('Login response:', response);
        if (response && response.success) {
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
    this.userService.registerUser(this.user.email, this.user.password).subscribe(
      () => {
        // Handle registration success
      },
      (error) => {
        console.error('Registration error:', error);
        this.errorMessage = error.message || 'An error occurred during registration.';
      }
    );
  }
}
