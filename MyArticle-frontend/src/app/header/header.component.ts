import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private articleService: ArticleService, private router : Router) {   this.router.events.subscribe((event) => {
    if (event instanceof NavigationEnd) {
      console.log('Current URL:', event.url);
    }
  });}

  ngOnInit(): void {
  }
  logout(): void {
    console.log('Logout method called');
    this.articleService.logout(); // Assuming this method doesn't return an Observable
    this.router.navigate(['/login']).catch((err: any) => console.error('Navigation Error:', err));
  }
  navigateToProfile() {
    console.log('Navigating to profile...');
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.router.navigate(['/user-profile', userId]);
    } else {
      console.log('No user ID found');
      // Handle the case where there's no user ID
    }
  }



}
