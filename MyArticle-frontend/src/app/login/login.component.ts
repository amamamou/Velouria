// login.component.ts
import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';
import { User } from 'src/user.model';
import { Admin } from 'src/admin.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

user: User = new User(0, '', '', '', '', '', '');
  admin: Admin = new Admin('', '', '');
  errorMessage: string = '';
  isUserLogin: boolean = true;
  showRegisterForm: boolean = false;
  newUser = { email: '', password: '' };
  confirmPassword = '';

  constructor(private router : Router, private articleService: ArticleService) { }

  ngOnInit(): void {
  }

  onUserLogin(): void {
    this.articleService.loginUser(this.user.email, this.user.password)
      .subscribe(
        response => {
          // Assuming the response contains the user's ID
          if(response && response.userId) {
            localStorage.setItem('userId', response.userId);
            this.router.navigate(['/article-list']).catch(err => console.error('Navigation Error:', err));
          } else {
            console.error('User ID not found in the response');
            this.errorMessage = 'Login failed. Please try again.';
          }
        },
        error => {
          this.errorMessage = 'Invalid user credentials';
        }
      );
  }


  onAdminLogin(): void {
    this.articleService.loginAdmin(this.admin.email, this.admin.password)
      .subscribe(
        success => {
          this.router.navigate(['/article-list']).catch(err => console.error('Navigation Error:', err));
        },
        error => {
          this.errorMessage = 'Invalid admin credentials';
        }
      );
  }


  onRegister(): void {
    if (this.user.password === this.confirmPassword) {
      this.articleService.registerUser(this.user).subscribe({
        next: (response) => {
          console.log('User registered successfully', response);
          this.router.navigate(['/login']).catch(err => console.error('Navigation Error:', err));

          // Handle successful registration
          // You may want to redirect the user or show a success message
        },
        error: (error) => {
          console.error('Registration failed', error);
          // Handle registration errors
          // Show an error message to the user
        }
      });
    } else {
      // Handle password mismatch
      console.error('Passwords do not match');
      // Implement your logic to inform the user about the mismatch
    }
  }
}
