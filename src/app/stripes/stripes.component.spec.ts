import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StripesComponent } from './stripes.component';

describe('StripesComponent', () => {
  let component: StripesComponent;
  let fixture: ComponentFixture<StripesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StripesComponent]
    });
    fixture = TestBed.createComponent(StripesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
