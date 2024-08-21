import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateExogenousComponent } from './create-exogenous.component';

describe('CreateExogenousComponent', () => {
  let component: CreateExogenousComponent;
  let fixture: ComponentFixture<CreateExogenousComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateExogenousComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateExogenousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
