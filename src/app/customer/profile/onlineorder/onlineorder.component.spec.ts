import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineorderComponent } from './onlineorder.component';

describe('OnlineorderComponent', () => {
  let component: OnlineorderComponent;
  let fixture: ComponentFixture<OnlineorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnlineorderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnlineorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
