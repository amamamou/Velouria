// login.component.ts

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

  ngOnInit(): void {}

  onUserLogin() {
    const loginCredentials = {
      email: this.user.email,
      password: this.user.password
    };

    this.userService.loginUser(loginCredentials).subscribe(
      (response) => {
        if (response && response.user && response.user.token) {
          this.loginSuccess(response);
          this.router.navigate(['/article-list']);
        } else {
          this.errorMessage = 'Login failed. Please try again.';
        }
      },
      (error) => {
        console.error('Login error:', error);
        this.errorMessage = error.error ? error.error.message : 'An error occurred. Please try again.';
      }
    );
  }

  loginSuccess(response: any): void {
    console.log('Login Successful. Response:', response);
    const token = response.user.token;
    localStorage.setItem('token', token);
    this.userService.setLoggedInValue(true); // Update loggedIn status in UserService
    this.router.navigate(['/article-list']);
  }

  onRegister() {
    this.userService.registerUser(this.user.email, this.user.password).subscribe(
      () => {
        // Handle registration success
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }
}
