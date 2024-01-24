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

  user: User = new User(0,'','', '');
  admin: Admin = new Admin('', '', '');
  errorMessage: string = '';
  isUserLogin: boolean = true;


  constructor(private router : Router, private articleService: ArticleService) { }

  ngOnInit(): void {
  }

  onUserLogin(): void {
    this.articleService.loginUser(this.user.email, this.user.password)
      .subscribe(
        success => {
          this.router.navigate(['/article-list']).catch(err => console.error('Navigation Error:', err));
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
}
