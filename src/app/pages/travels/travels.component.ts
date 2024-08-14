import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { CreateRoutesComponent } from 'src/app/modal_forms/create-routes/create-routes.component';
import { MatDialog } from '@angular/material/dialog';
import { ViewTravelComponent } from 'src/app/modal_views/view-travel/view-travel.component';
import { RoutesService } from 'src/app/services/routes.service';

export interface RoutesData {
  viaje_id: number;
  fo_viaje_usuario: string;
  viaje_destino_inicio: string;
  viaje_destino_llegada: string;
  viaje_fecha_inicio: string;
  viaje_fecha_llegada: string;
  viaje_planilla:string;
  viaje_total_gastos:string;
  viaje_total_ganancias:string;
  viaje_estatus:string;
  viaje_neto_pago:string;
}

@Component({
  selector: 'app-travels',
  templateUrl: 'travels.component.html',
  styleUrls: ['travels.component.scss']
})
export class TravelsComponent implements OnInit {
  displayedColumns: string[] = ['viaje_id', 'viaje_nombre_conducto','viaje_ruta','viaje_flete','viaje_neto_pago', 'viaje_anticipo', 'viaje_total_gastos','viaje_total_ganancias', 'action'];
  dataSource: MatTableDataSource<RoutesData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient, public dialog: MatDialog, private routesService: RoutesService) { }

  ngOnInit() {
    this.loadData();
  }

  openDialog() {
    const dialogRef = this.dialog.open(CreateRoutesComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.loadData();
    });
  }
editRoute(viaje_id: number){
  const dialogRef = this.dialog.open(CreateRoutesComponent,{
    data:{viaje_id:viaje_id}
  });
}
  openView() {
    const dialogView = this.dialog.open(ViewTravelComponent);

    dialogView.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  loadData() {
    this.routesService.getRoutes().subscribe((data:any)=>{
      // console.log(data);
      const routesData: RoutesData[] = data.map(route => ({
        viaje_id: route.viaje_id,
        fo_viaje_usuario: route.fo_viaje_usuario,
        viaje_destino_inicio: route.viaje_destino_inicio,
        viaje_destino_llegada: route.viaje_destino_llegada,
        viaje_fecha_inicio: route.viaje_fecha_inicio,
        viaje_fecha_llegada: route.viaje_fecha_llegada,
        viaje_planilla:route.viaje_planilla,
        viaje_total_gastos:route.viaje_total_gastos,
        viaje_flete:route.viaje_flete,
        viaje_neto_pago:route.viaje_neto_pago,
        viaje_anticipo:route.viaje_anticipo,
        viaje_nombre_conducto:route.nombre_conductor,
        viaje_total_ganancias:route.viaje_total_ganancias,
        viaje_estatus:route.viaje_estatus
      }));
      this.dataSource = new MatTableDataSource(routesData);
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
