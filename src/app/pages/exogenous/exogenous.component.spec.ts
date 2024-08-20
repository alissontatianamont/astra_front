import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExogenousComponent } from './exogenous.component';

describe('ExogenousComponent', () => {
  let component: ExogenousComponent;
  let fixture: ComponentFixture<ExogenousComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExogenousComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExogenousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
