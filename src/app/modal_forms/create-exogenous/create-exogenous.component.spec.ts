import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateExogenousComponent } from './create-exogenous.component';
import { MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { ExogenousService } from 'src/app/services/exogenous.service';
import { of } from 'rxjs';

describe('CreateExogenousComponent', () => {
  let component: CreateExogenousComponent;
  let fixture: ComponentFixture<CreateExogenousComponent>;

  // Mock del servicio ExogenousService
  const mockExogenousService = {
    getExogenousOne: jest.fn().mockReturnValue(of({})),
    createExogenous: jest.fn().mockReturnValue(of({})),
    updateExogenous: jest.fn().mockReturnValue(of({})),
  };

  // Mock del MatDialogRef
  const mockDialogRef = {
    close: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateExogenousComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: ExogenousService, useValue: mockExogenousService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateExogenousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
