import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageArticlesComponent } from './manage-articles.component';

describe('ManageArticlesComponent', () => {
  let component: ManageArticlesComponent;
  let fixture: ComponentFixture<ManageArticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageArticlesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
