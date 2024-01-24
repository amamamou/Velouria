import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../article.service';
import { Article } from '../article.model';
import { Category } from '../category.model';

@Component({
  selector: 'app-article-category',
  templateUrl: './article-category.component.html',
  styleUrls: ['./article-category.component.css']
})
export class ArticleCategoryComponent implements OnInit {
  categoryId!: number; // Using the non-null assertion operator
  articles: Article[] = [];
  category!: Category; // Add this


  constructor(private route: ActivatedRoute, private articleService: ArticleService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.categoryId = +id;
      this.loadArticles();
      this.loadCategory(); // Load the category

    } else {
      // Handle the case where id is null
      console.error('Category ID is null');
      // You might want to redirect the user or show an error message
    }
  }
  loadCategory() {
    // Convert categoryId to a string
    this.articleService.getCategoryById(this.categoryId.toString())
      .subscribe(
        data => {
          this.category = data;
        },
        error => {
          console.error('Error fetching category:', error);
        }
      );
  }


  loadArticles() {
    this.articleService.getArticlesByCategory(this.categoryId.toString())
      .subscribe(
        data => {
          this.articles = data;
        },
        error => {
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
