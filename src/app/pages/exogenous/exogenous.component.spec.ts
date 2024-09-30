import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';  // Importar NO_ERRORS_SCHEMA
import { ExogenousComponent } from './exogenous.component';

describe('ExogenousComponent', () => {
  let component: ExogenousComponent;
  let fixture: ComponentFixture<ExogenousComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExogenousComponent ],
      schemas: [NO_ERRORS_SCHEMA]  // Añadir NO_ERRORS_SCHEMA aquí
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
