import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEgressComponent } from './view-egress.component';

describe('ViewEgressComponent', () => {
  let component: ViewEgressComponent;
  let fixture: ComponentFixture<ViewEgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEgressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
