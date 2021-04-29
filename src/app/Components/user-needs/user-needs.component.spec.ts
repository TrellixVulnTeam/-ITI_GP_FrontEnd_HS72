import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNeedsComponent } from './user-needs.component';

describe('UserNeedsComponent', () => {
  let component: UserNeedsComponent;
  let fixture: ComponentFixture<UserNeedsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserNeedsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserNeedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
