import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';
import { Article } from '../article.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  articles: Article[] = [];
  hoverStates = new Map<number, boolean>();

  constructor(private articleService: ArticleService,private router: Router ) {} // Add this) { }

  ngOnInit(): void {
    this.articleService.getAllArticles().subscribe(data => {
      this.articles = data;
      this.articles = data.slice(0, 800); // Fetch only the first three articles
      // If you want only the first few articles:
      // this.articles = data.slice(0, 5); // Adjust the number as needed
    });
  }
  getImageUrl(imagePath: string): string {
    return `http://localhost:3000/${imagePath}`;
  }
  imageError(event: any): void {
    // Handle the error, maybe set a default image
    console.error('Error loading image:', event);
  }
  setHoverState(articleId: number | undefined, state: boolean): void {
    if (articleId !== undefined) {
      this.hoverStates.set(articleId, state);
    }
  }

  getHoverState(articleId: number | undefined): boolean {
    return articleId !== undefined ? this.hoverStates.get(articleId) || false : false;
  }


}
