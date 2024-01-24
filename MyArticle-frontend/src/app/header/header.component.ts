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
    console.log('Logout method called');
    this.articleService.logout(); // Assuming this method doesn't return an Observable
    this.router.navigate(['/login']).catch((err: any) => console.error('Navigation Error:', err));
  }

}
