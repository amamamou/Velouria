import { Component } from '@angular/core';
import { ArticleService } from '../article.service';
import { User } from 'src/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: User = new User(0,'','','');

  constructor(private articleService: ArticleService) {}

  onRegister(): void {
    this.articleService.registerUser(this.user).subscribe({
      next: (response) => {
        console.log('User registered successfully', response);
        // Handle successful registration
      },
      error: (error) => {
        console.error('Registration failed', error);
        // Handle registration errors
      }
    });
  }
}
