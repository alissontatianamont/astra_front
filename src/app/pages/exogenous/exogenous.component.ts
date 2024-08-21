import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CreateExogenousComponent } from 'src/app/modal_forms/create-exogenous/create-exogenous.component';
import { ViewExogenousComponent } from 'src/app/modal_views/view-exogenous/view-exogenous.component';
import { ExogenousService } from 'src/app/services/exogenous.service';
import Swal from 'sweetalert2';

export interface ExogenousData {
  exogena_id: number;
  exogena_nit: string;
  exogena_dv: string;
  exogena_nombre1: string;
  exogena_nombre2: string;
  exogena_apellido1: string;
  exogena_apellido2: string;
  exogena_razon_social: string;
  exogena_direccion: string;
  exogena_ciudad: string;
  exogena_departamento: string;
  exogena_tipo: string;
  exogena_estatus: string;
}

@Component({
  selector: 'app-exogenous',
  templateUrl: './exogenous.component.html',
  styleUrls: ['./exogenous.component.scss']
})
export class ExogenousComponent implements OnInit {
  displayedColumns: string[] = ['exogena_id','exogena_tipo' , 'exogena_nit', 'exogena_razon_social_nombre', 'exogena_direccion', 'exogena_ciudad', 'exogena_departamento', 'action'];
  dataSource: MatTableDataSource<ExogenousData>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private exogenousService: ExogenousService, public dialog: MatDialog) { }

  ngOnInit(): void {
  this.loadData();
  }
  getDisplayName(row: any): string {
    if (row.exogena_razon_social) {
      return row.exogena_razon_social;
    } else {
      const nombre1 = row.exogena_nombre1 || '';
      const nombre2 = row.exogena_nombre2 || '';
      const apellido1 = row.exogena_apellido1 || '';
      const apellido2 = row.exogena_apellido2 || '';
      return [nombre1, nombre2, apellido1, apellido2].filter(val => val).join(' ');
    }
  }
  openDialog() {
    const dialogRef = this.dialog.open(CreateExogenousComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.loadData();
    });
  }
  editExogenous(exogenous_id: number) {
    const dialogRef = this.dialog.open(CreateExogenousComponent, {
      data: { exogenous_id: exogenous_id }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadData();
    });
  }
  deleteExogenous(exogenous_id: number){
    Swal.fire({
      text: "¿Seguro desea eliminar esta información?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "si, eliminar",
      cancelButtonText: "cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.exogenousService.deleteExogenous(exogenous_id).subscribe({
          next: (response) => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Información exógena eliminada con éxito",
              showConfirmButton: false,
              timer: 1500
            });
            this.loadData();
          },
          error: (error) => {
            console.error('bad', error);
          },
        });
      }
      this.loadData();
    });

  }
  loadData(){
    this.exogenousService.getExogenous().subscribe((data:any)=>{
      const exogenousData: ExogenousData[] = data.map(exogenous => ({
        exogena_id: exogenous.exogena_id ,
        exogena_nit: exogenous.exogena_nit ,
        exogena_dv: exogenous.exogena_dv ,
        exogena_nombre1: exogenous.exogena_nombre1 ,
        exogena_nombre2: exogenous.exogena_nombre2 ,
        exogena_apellido1: exogenous.exogena_apellido1 ,
        exogena_apellido2: exogenous.exogena_apellido2 ,
        exogena_razon_social: exogenous.exogena_razon_social ,
        exogena_direccion: exogenous.exogena_direccion ,
        exogena_ciudad: exogenous.exogena_ciudad ,
        exogena_departamento: exogenous.exogena_departamento ,
        exogena_tipo: exogenous.exogena_tipo ,
        exogena_estatus: exogenous.exogena_estatus 
      }));
      this.dataSource = new MatTableDataSource(exogenousData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  viewExogenous(exogenous_id:number){
    const dialogRef = this.dialog.open(ViewExogenousComponent, {
      data: { exogenous_id: exogenous_id }
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
