import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableOfferComponent } from './available-offer.component';

describe('AvailableOfferComponent', () => {
  let component: AvailableOfferComponent;
  let fixture: ComponentFixture<AvailableOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailableOfferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
