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
import { AuthGuard } from 'src/auth.guard';

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




];

@NgModule({
  imports: [RouterModule.forRoot(routes),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
