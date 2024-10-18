import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateExogenousComponent } from './create-exogenous.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { ExogenousService } from 'src/app/services/exogenous.service';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

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

  // Mock del MatDialogData
  const mockDialogData = {
    // Aquí puedes incluir los datos que necesites para el test
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateExogenousComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData }, // Proporciona MatDialogData
        { provide: ExogenousService, useValue: mockExogenousService },
      ],
      schemas: [NO_ERRORS_SCHEMA],  // Permite ignorar otros errores de plantillas
    }).compileComponents();

    fixture = TestBed.createComponent(CreateExogenousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
