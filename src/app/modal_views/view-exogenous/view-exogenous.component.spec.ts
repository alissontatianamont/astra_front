import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewExogenousComponent } from './view-exogenous.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog'; // Importa esto

describe('ViewExogenousComponent', () => {
  let component: ViewExogenousComponent;
  let fixture: ComponentFixture<ViewExogenousComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewExogenousComponent ],
      imports: [ 
        HttpClientTestingModule,
        RouterTestingModule,
        MatDialogModule // Asegúrate de agregar esto
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} } // Proveer un valor para MatDialogData
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewExogenousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
