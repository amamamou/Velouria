import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageInteractionsComponent } from './manage-interactions.component';

describe('ManageInteractionsComponent', () => {
  let component: ManageInteractionsComponent;
  let fixture: ComponentFixture<ManageInteractionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageInteractionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageInteractionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
