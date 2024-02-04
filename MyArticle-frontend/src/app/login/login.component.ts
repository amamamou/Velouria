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
        console.log('Login response:', response);

        // Set token in localStorage
        this.userService.setToken(response.token);

        // Set authentication status
        this.userService.setAuthenticated(true);

        // Handle successful login
        this.loginSuccess(response);
        this.router.navigate(['/article-list']);

      },
      (error) => {
        console.error('Login error:', error);

        // Set error message
        this.errorMessage = error.error ? error.error : 'Incorrect email or password';
      }
    );
  }

// Example code in your login.component.ts
loginSuccess(response: any): void {
  localStorage.setItem('token', response.token); // or sessionStorage.setItem('token', response.token);
  // Other logic...
}


  onRegister() {
    this.userService.registerUser(this.user.email, this.user.password).subscribe(
      () => {
        // Registration successful
        // You might want to redirect or show a success message
      },
      (error) => {
        this.errorMessage = error; // Handle the error as needed
      }
    );
  }
}
