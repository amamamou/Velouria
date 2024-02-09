import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleCreateComponent } from './article-create/article-create.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { ArticleEditComponent } from './article-edit/article-edit.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ArticleCategoryComponent } from './article-category/article-category.component';
import { ArticleSearchComponent } from './article-search/article-search.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageArticlesComponent } from './manage-articles/manage-articles.component';
import { ManageCategoriesComponent } from './manage-categories/manage-categories.component';
import { AnalyticsComponent } from './analytics/analytics.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'article-list', component: ArticleListComponent },
  { path: 'articles', component: ArticleListComponent },
  { path: 'create', component: ArticleCreateComponent },
  { path: 'article/:id', component: ArticleDetailComponent },
  { path: 'edit-article/:id', component: ArticleEditComponent },
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'categories/:id', component: ArticleCategoryComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'logout', redirectTo: '/login' }, // Assuming logout is handled elsewhere
  { path: 'like/:articleId', component: ArticleDetailComponent },
  { path: 'search-results', component: ArticleSearchComponent },
  { path: 'profile', component: UserProfileComponent },
  {path: 'admin-dashboard', component: DashboardComponent},
  { path: 'manage-users', component: ManageUsersComponent },
  { path: 'manage-articles', component: ManageArticlesComponent},
  { path: 'manage-categories', component: ManageCategoriesComponent},
  { path: 'analytics', component: AnalyticsComponent},




];

@NgModule({
  imports: [RouterModule.forRoot(routes),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
