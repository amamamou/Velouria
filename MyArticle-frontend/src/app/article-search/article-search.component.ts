import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../article.service';
import { Article } from '../article.model';

@Component({
  selector: 'app-article-search',
  templateUrl: './article-search.component.html',
  styleUrls: ['./article-search.component.css']
})
export class ArticleSearchComponent implements OnInit {
  articles: Article[] = [];
  searchTerm: string = '';

  constructor(private route: ActivatedRoute, private articleService: ArticleService) { }

  ngOnInit(): void {
    // Get the search term from the route parameters
    this.route.params.subscribe(params => {
      this.searchTerm = params['term'];
      // Call a method to fetch articles based on the search term
      this.fetchArticles();
    });
  }

  // Corrected method name
  fetchArticles(): void {
    // Call your service method to fetch articles based on the search term
    this.articleService.getArticlesBySearchTerm(this.searchTerm).subscribe(
      (data) => {
        this.articles = data;
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
}
