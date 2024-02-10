import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleCreateComponent } from './article-create/article-create.component';
import { ArticleEditComponent } from './article-edit/article-edit.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ModalComponent } from './modal/modal.component';
import { ArticleCategoryComponent } from './article-category/article-category.component';
import { DefaultImagePipe } from 'src/default-image.pipe';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { CommonModule } from '@angular/common';
import { ArticleSearchComponent } from './article-search/article-search.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageArticlesComponent } from './manage-articles/manage-articles.component';
import { ManageCategoriesComponent } from './manage-categories/manage-categories.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { ManageInteractionsComponent } from './manage-interactions/manage-interactions.component';
import { ManageNotificationsComponent } from './manage-notifications/manage-notifications.component';



@NgModule({
  declarations: [
    AppComponent,
    ArticleListComponent,
    ArticleCreateComponent,
    ArticleEditComponent,
    ArticleDetailComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    ModalComponent,
    ArticleCategoryComponent,
    DefaultImagePipe,
    EditProfileComponent,
    ArticleSearchComponent,
    UserProfileComponent,
    DashboardComponent,
    ManageUsersComponent,
    ManageArticlesComponent,
    ManageCategoriesComponent,
    AnalyticsComponent,
    ManageInteractionsComponent,
    ManageNotificationsComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,





  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
