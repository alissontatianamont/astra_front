import { Component,ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
export interface reportData {
  employee: string;
  route_travel: string;
  freight: string;
  money_advance: string;
  total_expenses: string;
  final_profit: string;

}
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent  {
  startDate: Date;
  endDate: Date;
  employees = new FormControl('');
  drivers = new FormControl('');
  employeeList: string[] = ['Empleado', 'Ruta', 'Flete', 'Anticipo', 'Gastos totales', 'Ganancia final'];

  
  driversList: string[] = ['David Mora', 'Antonio Castillo','Jose Nunez','Pablo Vargas', 'Miguel Soto' ];
  displayedColumns: string[] = ['employee', 'route_travel', 'freight', 'money_advance', 'total_expenses','final_profit'];
  dataSource: MatTableDataSource<reportData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient) {
    this.loadData();
  }

  loadData() {
    // Cambia la ruta del archivo JSON según tu estructura de proyecto
    this.http.get<reportData[]>('./assets/data/report.json').subscribe(data => {
      this.dataSource = new MatTableDataSource(data);

      // Configura el paginador y el objeto de clasificación aquí, después de que los datos estén disponibles
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  getData(){
    console.log(this.startDate);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
