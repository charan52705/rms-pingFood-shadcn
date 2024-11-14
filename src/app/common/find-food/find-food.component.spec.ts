import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindFoodComponent } from './find-food.component';

describe('FindFoodComponent', () => {
  let component: FindFoodComponent;
  let fixture: ComponentFixture<FindFoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindFoodComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
