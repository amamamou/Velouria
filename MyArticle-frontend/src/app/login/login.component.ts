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

        this.userService.setToken(response.token);

        this.userService.setAuthenticated(true);

        this.loginSuccess(response);
        this.router.navigate(['/article-list']);

      },
      (error) => {
        console.error('Login error:', error);

        this.errorMessage = error.error ? error.error : 'Incorrect email or password';
      }
    );
  }

loginSuccess(response: any): void {
 sessionStorage.setItem('token', response.token);
}


  onRegister() {
    this.userService.registerUser(this.user.email, this.user.password).subscribe(
      () => {
     //tombaed
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }
}
