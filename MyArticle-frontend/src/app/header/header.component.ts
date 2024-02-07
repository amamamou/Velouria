import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userId: string = '1'; // Assign the actual user ID here
  searchTerm: string = '';

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
  navigateToProfile(userId: string): void {
    this.router.navigate(['/profile', userId]);
  }

  search(): void {
    if (this.searchTerm.trim() !== '') {
      // Navigate to search-results page with search term as a parameter
      this.router.navigate(['/search-results', { term: this.searchTerm }]);
    }
}
}
