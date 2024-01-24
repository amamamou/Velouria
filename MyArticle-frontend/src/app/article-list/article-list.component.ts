import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';
import { Category } from '../category.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  articles: any[] = [];
  categories: Category[] = []; // Define the type here


  constructor(private articleService: ArticleService,private router: Router ) { }

  ngOnInit(): void {
    this.articleService.getAllArticles().subscribe(
      data => {
        this.articles = data;
      },
      error => {
        console.error('There was an error!', error);
      }
    );
    this.articleService.getAllCategories().subscribe(data => {
      this.categories = data;
    });
  }
  getImageUrl(imagePath: string): string {
    return `http://localhost:3000/${imagePath}`;
  }
  imageError(event: any): void {
    // Handle the error, maybe set a default image
    console.error('Error loading image:', event);
  }
}
