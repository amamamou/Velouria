import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private articleService: ArticleService, private router : Router) { }

  ngOnInit(): void {
  }
  logout(): void {
    this.articleService.logout();
    this.router.navigate(['/login']); // Redirect to login or home page after logout
  }
}
