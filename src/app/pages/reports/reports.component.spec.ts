import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReportsComponent } from './reports.component';
import { ReportsService } from 'src/app/services/reports.service';
import Swal from 'sweetalert2';
import { of } from 'rxjs';

describe('ReportsComponent', () => {
  let component: ReportsComponent;
  let fixture: ComponentFixture<ReportsComponent>;
  let reportsService: ReportsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ReportsComponent],
      providers: [ReportsService],
    }).compileComponents();

    fixture = TestBed.createComponent(ReportsComponent);
    component = fixture.componentInstance;
    reportsService = TestBed.inject(ReportsService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should get reports name on init', () => {
    const mockReports = [{ rep_id: 1, rep_nombre: 'Test Report' }, { rep_id: 2, rep_nombre: 'EXOGENA Report' }];
    jest.spyOn(reportsService, 'getReportsName').mockReturnValue(of(mockReports));
    component.ngOnInit();
    expect(component.reportsName.length).toBe(1);
  });

  it('should show alert for incomplete data when getting report data', () => {
    const SwalSpy = jest.spyOn(Swal, 'fire');
    component.getReportData();
    expect(SwalSpy).toHaveBeenCalledWith(expect.objectContaining({
      icon: 'error',
      title: 'Datos incompletos',
      text: 'Por favor, complete los campos requeridos!',
    }));
  });

  it('should fetch report data successfully', () => {
    const mockData = [{ field1: 'value1', field2: 'value2' }];
    jest.spyOn(reportsService, 'getReportData').mockReturnValue(of(mockData));
    component.report_selected = 1;
    component.startDate = new Date();
    component.endDate = new Date();
    component.getReportData();
    expect(component.dataSource.data.length).toBe(1);
  });
});
