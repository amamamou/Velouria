import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ArticleService } from '../article.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userProfile: any;
  likedArticles: any[] = [];


  constructor(private articleService: ArticleService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.fetchUserProfile();
    this.fetchLikedArticles();


  }

  fetchUserProfile(): void {
    this.userService.getUserProfile().subscribe(
      (data: any) => {
        this.userProfile = data.user;
      },
      (error) => {
        console.error('Error fetching user profile:', error);
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
  fetchLikedArticles(): void {
    this.userService.getLikedArticles().subscribe(
      (articles: any) => {
        this.likedArticles = articles;
      },
      (error) => {
        console.error('Error fetching liked articles:', error);
      }
    );
  }
  logout(): void {
    console.log('Logout method called');
    this.articleService.logout(); // Assuming this method doesn't return an Observable
    this.router.navigate(['/login']).catch((err: any) => console.error('Navigation Error:', err));
  }

}
