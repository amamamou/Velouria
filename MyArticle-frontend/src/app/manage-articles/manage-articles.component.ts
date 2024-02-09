import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-manage-articles',
  templateUrl: './manage-articles.component.html',
  styleUrls: ['./manage-articles.component.css']
})
export class ManageArticlesComponent implements OnInit {
  articles: any[] = []; // Define a variable to hold articles

  constructor(private router: Router,private articleService: ArticleService, private adminService: AdminService) { }

  ngOnInit(): void {
    this.fetchArticles(); // Fetch articles when component initializes
  }

  fetchArticles(): void {
    this.articleService.getAllArticles().subscribe(
      (data) => {
        this.articles = data; // Assign fetched articles to the variable
        console.log('Articles:', this.articles);
      },
      (error) => {
        console.error('Error fetching articles:', error);
      }
    );
  }
  getImageUrl(imagePath: string): string {
    return `http://localhost:3000/${imagePath}`;
  }
  imageError(event: any): void {
    // Handle the error, maybe set a default image
    console.error('Error loading image:', event);
  }
  logout(): void {
    console.log('Logout method called');
    this.adminService.logoutAdmin(); // Assuming this method doesn't return an Observable
    this.router.navigate(['/login']).catch((err: any) => console.error('Navigation Error:', err));
  }
}
