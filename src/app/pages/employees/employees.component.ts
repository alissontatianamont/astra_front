import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { CreateEmployeesComponent } from 'src/app/modal_forms/create-employees/create-employees.component';
import { ViewEmployeeComponent } from 'src/app/modal_views/view-employee/view-employee.component';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

export interface EmployeeData {
  id_user: number;
  employee: string;
  id_card: string;
  position: string;
  hire_date: string;
  status: string;
  avatar_user:string;
}

@Component({
  selector: 'app-employees',
  templateUrl: 'employees.component.html',
  styleUrls: ['employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  users = [];
  displayedColumns: string[] = ['employee', 'id_card', 'position', 'hire_date', 'status', 'action'];
  dataSource: MatTableDataSource<EmployeeData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private authService: AuthService, private http: HttpClient, public dialog: MatDialog) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.authService.getUsers().subscribe((data: any) => {
      console.log(data);
      
      // Mapea los datos recibidos a la estructura esperada por la tabla
      const employees: EmployeeData[] = data.map(user => ({
       
        id_user: user.usuario_id,
        employee: user.nombre_usuario,
        id_card: user.cedula.toString(),
        position: user.rol,
        hire_date: user.fecha_creacion,
        status: user.estado_usuario.toString(),
        avatar_user: user.avatar
      }));

      this.dataSource = new MatTableDataSource(employees);
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


  newEmployee() {
    const dialogRef = this.dialog.open(CreateEmployeesComponent);

    dialogRef.componentInstance.userCreated.subscribe(() => {
      dialogRef.close();
      this.loadData(); 
    });
  }
editEmployee(id_user: number){
  const dialogRef = this.dialog.open(CreateEmployeesComponent,{
    data:{id_user:id_user}
  });

  dialogRef.componentInstance.userCreated.subscribe(() => {
    dialogRef.close();
    this.loadData(); 
  });
}
deleteEmployee(id_user: number){
  Swal.fire({
    title: "¿Estás seguro de eliminar a este usuario?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "NO",
    confirmButtonText: "SI"
  }).then((result) => {
    if (result.isConfirmed) {
      this.authService.deleteUser(id_user).subscribe((data:any)=>{
        Swal.fire({
          title: "Se ha eliminado correctamente",
          icon: "success"
        });
      });
      this.loadData(); 
      

    }
  });

}
  viewEmployee(id_user: number,avatar_user:string) {
    const viewEmployee = this.dialog.open(ViewEmployeeComponent,{
      data:{id_user:id_user, avatar_user:avatar_user}
    });

    
  }
}
