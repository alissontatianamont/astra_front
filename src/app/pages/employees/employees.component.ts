import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { CreateEmployeesComponent } from 'src/app/modal_forms/create-employees/create-employees.component';
import { ViewEmployeeComponent } from 'src/app/modal_views/view-employee/view-employee.component';
export interface EmployeeData {
  employee: string;
  id_card: string;
  position: string;
  hire_date: string;
  status: string;
}
@Component({
  selector: 'app-employees',
  templateUrl: 'employees.component.html',
  styleUrls: ['employees.component.scss']
})
export class EmployeesComponent {
  displayedColumns: string[] = ['employee', 'id_card', 'position', 'hire_date', 'status','action'];
  dataSource: MatTableDataSource<EmployeeData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient,public dialog: MatDialog) {
    this.loadData();
  }


  newEmployee() {
    const dialogRef = this.dialog.open(CreateEmployeesComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
    viewEmployee(){
      const viewEmployee = this.dialog.open(ViewEmployeeComponent);
      
    }
  loadData() {
    // Cambia la ruta del archivo JSON según tu estructura de proyecto
    this.http.get<EmployeeData[]>('./assets/data/employees.json').subscribe(data => {
      this.dataSource = new MatTableDataSource(data);

      // Configura el paginador y el objeto de clasificación aquí, después de que los datos estén disponibles
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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

