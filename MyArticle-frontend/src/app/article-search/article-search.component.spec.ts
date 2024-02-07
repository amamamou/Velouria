import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleSearchComponent } from './article-search.component';

describe('ArticleSearchComponent', () => {
  let component: ArticleSearchComponent;
  let fixture: ComponentFixture<ArticleSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
