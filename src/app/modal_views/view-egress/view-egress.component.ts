import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GeneralEgressService } from 'src/app/services/general-egress.service';
import { CreateEgressComponent } from 'src/app/modal_forms/create-egress/create-egress.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-egress',
  templateUrl: './view-egress.component.html',
  styleUrls: ['./view-egress.component.scss']
})

export class ViewEgressComponent implements OnInit {
  globalEgressDescription: any[] = [];  // Datos generales
  globalEgressData: any[] = []; // Egresos globales (egreso_global === 1)
  individualEgress: any[] = []; // Egresos individuales (egreso_global === 0)
  route_id: any;
  panelOpenState: boolean[] = [];
  panelOpenStateSingle: boolean[] = [];
  constructor(private generalEgressService: GeneralEgressService, @Inject(MAT_DIALOG_DATA) public route_data_id: any, public dialog: MatDialog, public dialogView: MatDialogRef<ViewEgressComponent>) {
    this.route_id = this.route_data_id.viaje_id;
  }
  editEgressGlobal(egress_id: any, route_id: any, egress_global: any) {
    const dialogRef = this.dialog.open(CreateEgressComponent, {
      data: { egress_id: egress_id, viaje_id: route_id, egress_global: egress_global }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.dialogView.close();
    });
  }

  editSingleEgress(egress_id: any, route_id: any, egress_global: any) {
    const dialogRef = this.dialog.open(CreateEgressComponent, {
      data: { egress_id: egress_id, viaje_id: route_id, egress_global: egress_global }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.dialogView.close();
    });
  }
  deleteSingleEgress(egress_id: any, route_id: any) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, bórralo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.generalEgressService.deleteSingleEgress(route_id, egress_id).subscribe(() => {
          Swal.fire(
            {
              position: "center",
              icon: "success",
              title: "Gasto eliminado con éxito",
              showConfirmButton: false,
              timer: 1000
            }
          );
          this.dialogView.close();
        });
      }
    });
  }
  deleteGlobalEgress(egress_id: any) {
    Swal.fire({
      title: '¿Está seguro de eliminar este gasto?',
      text: "¡No podrá revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí'
    }).then((result) => {
      if (result.isConfirmed) {
        this.generalEgressService.deleteGlobalEgress(egress_id).subscribe(() => {
          Swal.fire(
            {
              position: "center",
              icon: "success",
              title: "Gasto eliminado con éxito",
              showConfirmButton: false,
              timer: 1000
            }
          );
          this.dialogView.close();
        });
      }
    });
  }
  ngOnInit(): void {
    this.panelOpenState = new Array(this.globalEgressData.length).fill(false);
    this.panelOpenStateSingle = new Array(this.individualEgress.length).fill(false);
  
    this.generalEgressService.showOrFetchGlobalEgress(this.route_id).subscribe((data: any) => {
      if (!data.status_data || data.status_data !== 0) {
        if (Array.isArray(data)) {
          this.individualEgress = data.filter(item => item.egreso_global === 0); // Filtramos los egresos individuales
          this.globalEgressDescription = data.filter(item => item.desglose_gastos); // Aseguramos que todos los gastos globales están presentes
        } 
      }
    });
  
    // desglose de gastos individuales
    this.generalEgressService.getSingleEgress(this.route_id).subscribe((data: any) => {
      if (Array.isArray(data)) {
        this.individualEgress = data;
      }
    });
  }
  

}
