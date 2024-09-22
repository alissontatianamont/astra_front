import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ReportsService } from 'src/app/services/reports.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  startDate: Date;
  endDate: Date;
  report_selected: number;
  report_selected_name: string;
  reportsName: any[] = [];
  displayedColumns: string[] = [];
  dataSource: MatTableDataSource<any> = new MatTableDataSource([]); // Inicializar como vacío

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient, private reportsService: ReportsService) {}

  ngOnInit() {
    this.reportsService.getReportsName().subscribe((data: any) => {
      this.reportsName = data.filter((report: any) => !report.rep_nombre.includes('EXOGENA'));
    });
  }

  getReportData() {
    let rep_id = this.report_selected;
    if (!rep_id || !this.startDate || !this.endDate) {
      Swal.fire({
        icon: 'error',
        title: 'Datos incompletos',
        text: 'Por favor, complete los campos requeridos!',
      });
      return;
    }
    if (this.startDate > this.endDate) {
      Swal.fire({
        icon: 'error',
        title: 'Error de fecha',
        text: 'La fecha de inicio no puede ser mayor a la fecha final',
      });
      return;
    }

    // Convertir las fechas a YYYY-MM-DD
    const startDate = this.formatDate(this.startDate);
    const endDate = this.formatDate(this.endDate);

    this.reportsService.getReportData(rep_id, startDate, endDate).subscribe((data: any) => {
      this.dataSource = new MatTableDataSource(data);
      this.displayedColumns = Object.keys(data[0] || {}); 

      // Configura el paginador y el objeto de clasificación aquí
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  
  formatDate(date: Date): string {
    const dateObj = new Date(date);
    return `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1).toString().padStart(2, '0')}-${dateObj.getDate().toString().padStart(2, '0')}`;
  }


  downloadReport() {
    // Verifica que los campos estén completos antes de hacer la solicitud
    if (!this.report_selected || !this.startDate || !this.endDate) {
      Swal.fire({
        icon: 'error',
        title: 'Datos incompletos',
        text: 'Por favor, complete los campos requeridos!',
      });
      return;
    }
  
    // Obtén el nombre del reporte seleccionado
    const report = this.reportsName.find(report => report.rep_id === this.report_selected);
    const reportName = report ? report.rep_nombre : 'REPORTE'; 
  

    const todayTimestamp = this.formatDate(new Date());
  
    this.reportsService.downloadReport(this.report_selected, this.formatDate(this.startDate), this.formatDate(this.endDate))
      .subscribe((response: Blob) => {
        // Crea un blob con la respuesta
        const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  
        // Crea un enlace y dispara la descarga
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${reportName}_${todayTimestamp}.xlsx`; // Nombre del archivo con el nombre del reporte y la fecha
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      },
      error => {
        console.log(error);
        
        // Manejo de errores
        Swal.fire({
          icon: 'error',
          title: 'Error al descargar',
          text: 'No se pudo descargar el reporte. Intente de nuevo más tarde.',
        });
      });
  }
  downloadExogenousReport(){
    this.reportsService.downloadExogenousReport().subscribe((response: Blob) => {
      const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `REPORTE_EXOGENA_${this.formatDate(new Date())}.xlsx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
