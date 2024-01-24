import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleCategoryComponent } from './article-category.component';

describe('ArticleCategoryComponent', () => {
  let component: ArticleCategoryComponent;
  let fixture: ComponentFixture<ArticleCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
