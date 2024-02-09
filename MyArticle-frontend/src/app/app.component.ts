import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MyArticle-frontend';
  showHeaderAndFooter: boolean = true;

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Now TypeScript knows event is of type NavigationEnd
        this.showHeaderAndFooter = !['/login', '/admin-dashboard', '/manage-users', '/manage-articles','/manage-categories','/analytics'].includes(event.url);
      }
    });
  }
}
