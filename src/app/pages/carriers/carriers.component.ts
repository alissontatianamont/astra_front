import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CreateCarriersComponent } from 'src/app/modal_forms/create-carriers/create-carriers.component';
import { ViewCarrierComponent } from 'src/app/modal_views/view-carrier/view-carrier.component';
import { CarriersService } from 'src/app/services/carriers.service';
import Swal from 'sweetalert2';
export interface CarriersData {
  transportadora_id: number;
  transportadora_razon_social: string;
  transportadora_nit: string;
  transportadora_direccion: string;
  transportadora_telefono: string;
  transportadora_dv: string;
  transportadora_ciudad: string;
  transportadora_departamento: string;
  transportadora_estatus: string;
}

@Component({
  selector: 'app-carriers',
  templateUrl: './carriers.component.html',
  styleUrls: ['./carriers.component.scss']
})
export class CarriersComponent implements OnInit {
  displayedColumns: string[] = ['transportadora_id', 'transportadora_razon_social', 'transportadora_nit', 'transportadora_direccion', 'transportadora_telefono', 'transportadora_ciudad', 'transportadora_departamento', 'action'];
  dataSource: MatTableDataSource<CarriersData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private carriersService: CarriersService, private http: HttpClient, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }
  openDialog() {
    const dialogRef = this.dialog.open(CreateCarriersComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.loadData();
    });
  }
  editCarrier(carrier_id: number) {
    const dialogRef = this.dialog.open(CreateCarriersComponent, {
      data: { carrier_id: carrier_id }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadData();
    });
  }
  deleteCarrier(carrier_id: number){
    Swal.fire({
      text: "¿Seguro desea eliminar esta transportadora?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "si, eliminar",
      cancelButtonText: "cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.carriersService.deleteCarrier(carrier_id).subscribe({
          next:(data: any)=>{
            if (data.status == 1) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Transportadora eliminada con éxito",
                showConfirmButton: false,
                timer: 1500
              });
            }else{
              Swal.fire({
                position: "center",
                icon: "error",
                title: "No se puede eliminar la transportadora, tiene viajes asociados",
                showConfirmButton: false,
                timer: 1500
              });
            }

          },
          error:(error)=>{
            console.error('bad',error);
          },
        });
      }
      this.loadData();
    });

  }
  viewCarrier(carrier_id: number){
    const viewCarrier = this.dialog.open(ViewCarrierComponent,{
      data:{carrier_id:carrier_id}
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  loadData() {
    this.carriersService.getCarriers().subscribe((data: any) => {

      const carriersData: CarriersData[] = data.map(carrier => ({
        transportadora_id: carrier.transportadora_id,
        transportadora_razon_social: carrier.transportadora_razon_social,
        transportadora_nit: carrier.transportadora_nit,
        transportadora_direccion: carrier.transportadora_direccion,
        transportadora_telefono: carrier.transportadora_telefono,
        transportadora_dv: carrier.transportadora_dv,
        transportadora_ciudad: carrier.transportadora_ciudad,
        transportadora_departamento: carrier.transportadora_departamento,
        transportadora_estatus: carrier.transportadora_estatus,
      }));
      this.dataSource = new MatTableDataSource(carriersData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}
