import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEgressComponent } from './create-egress.component';

describe('CreateEgressComponent', () => {
  let component: CreateEgressComponent;
  let fixture: ComponentFixture<CreateEgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEgressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
