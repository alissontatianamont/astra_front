import { Component, Inject, OnInit, EventEmitter, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { ExogenousService } from 'src/app/services/exogenous.service';
import { GeneralEgressService } from 'src/app/services/general-egress.service';
import Swal from 'sweetalert2';
export interface GlobalEgressData {
  gasto_global: number,
  gasto_descripcion: string,
  gasto_valor: string
}
export interface BreakdownEgressData {
  egreso_id: number,
  fo_egreso_viaje: string,
  egreso_global: string,
  egreso_exogenable: number,
  fo_egreso_gasto_global: string,
  fo_egreso_proveedor: string,
  egreso_descripcion: string,
  egreso_valor: string,
}
@Component({
  selector: 'app-create-egress',
  templateUrl: './create-egress.component.html',
  styleUrls: ['./create-egress.component.scss']
})
export class CreateEgressComponent implements OnInit {

  route_id: any;
  egress_data_id: any;
  egress_id: any;
  egress_global_status: any;
  exogenous: any[] = [];
  habilitarDetalle: boolean = false;
  constructor(private exogenousService: ExogenousService, private dialogRef: MatDialogRef<GeneralEgressService>, @Inject(MAT_DIALOG_DATA) public data, private generalEgressService: GeneralEgressService) {
    if (data?.viaje_id) { this.route_id = data.viaje_id; }
    if (data?.egress_id) { this.egress_id = data.egress_id }
    if (data?.egress_global !== undefined && data.egress_global !== null) {
      this.egress_global_status = data.egress_global;
    }

  }
  @Output() generalEgressCreated = new EventEmitter<void>();

  globalEgressData: GlobalEgressData = {
    gasto_global: null,
    gasto_descripcion: '',
    gasto_valor: null
  }

  breakdownEgressData: BreakdownEgressData = {
    egreso_id: null,
    fo_egreso_viaje: '',
    egreso_global: '',
    egreso_exogenable: null,
    fo_egreso_gasto_global: '',
    fo_egreso_proveedor: '',
    egreso_descripcion: '',
    egreso_valor: '',
  }
  egressItems = [
    {
      egreso_id: null,
      egreso_exogenable: '',
      fo_egreso_proveedor: '',
      gasto_descripcion: '',
      gasto_valor: null
    }
  ];

  formData: any;
  totalCost: number = 0;

  onSelectionChange(event: MatSelectChange, data_interface: any) {
    data_interface = +event.value; // Convertir a número
  }

  clearExogenousFields(event: MatSelectChange, item: any) {
    (event.value == 2) ? item.fo_egreso_proveedor = '': '';
  }
  
  addRow() {
    this.egressItems.push({
      egreso_id: null,
      egreso_exogenable: '',
      fo_egreso_proveedor: '',
      gasto_descripcion: '',
      gasto_valor: null
    });
  }
  getExogenous(): void {
    this.exogenousService.getExogenousSelect().subscribe((data: any) => {
      this.exogenous = data;
    });
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
  
  ngOnInit(): void {
    this.getExogenous();
    if (this.egress_id !== undefined) {

      if (this.egress_global_status === 1) {
        this.globalEgressData.gasto_global = 1;

        // Inicializa con una fila vacía por defecto
        this.egressItems = [{
          egreso_id: null,
          egreso_exogenable: null,
          fo_egreso_proveedor: null,
          gasto_descripcion: '',
          gasto_valor: null
        }];

        this.generalEgressService.getOneGlobalEgress(this.egress_id).subscribe((data: any) => {

          const gasto_g_valor = this.formatToPesos(data.gasto_g_valor);
          this.globalEgressData = {
            gasto_global: 1,
            gasto_descripcion: data.gasto_g_descripcion,
            gasto_valor: gasto_g_valor,
          };

          const egress_details = data.desglose_gastos;
          egress_details.forEach((element: any, index: number) => {
            const egreso_valor = this.formatToPesos(element.egreso_valor);
            if (index === 0) {
              this.egressItems[0] = {
                egreso_id: element.egreso_id,
                egreso_exogenable: element.egreso_exogenable,
                fo_egreso_proveedor: element.fo_egreso_proveedor,
                gasto_descripcion: element.egreso_descripcion,
                gasto_valor: egreso_valor
              };
            } else {
              this.egressItems.push({
                egreso_id: element.egreso_id,
                egreso_exogenable: element.egreso_exogenable,
                fo_egreso_proveedor: element.fo_egreso_proveedor,
                gasto_descripcion: element.egreso_descripcion,
                gasto_valor: egreso_valor
              });
            }
          });
          if (data.desglose_gastos.length > 0) {
            this.calculateTotal();
            this.habilitarDetalle = true;
          } else {
            this.habilitarDetalle = false;
          };
        });
      } else if (this.egress_global_status === 0) {
        this.globalEgressData.gasto_global = 0;
        this.generalEgressService.getOneSingleEgress(this.egress_id).subscribe((data: any) => {
          console.log(data);

          const egreso_valor = this.formatToPesos(data.egreso_valor);
          this.breakdownEgressData = {
            egreso_id: data.egreso_id,
            fo_egreso_viaje: data.fo_egreso_viaje,
            egreso_global: data.egreso_global,
            egreso_exogenable: data.egreso_exogenable,
            fo_egreso_gasto_global: data.fo_egreso_gasto_global,
            fo_egreso_proveedor: data.fo_egreso_proveedor,
            egreso_descripcion: data.egreso_descripcion,
            egreso_valor: egreso_valor
          };
        });
      }


    }

  }
  removeRow(index: number) {
    this.egressItems.splice(index, 1);
    this.calculateTotal();
  }
  calculateTotal() {
    this.totalCost = this.egressItems.reduce((sum, item) => {
      const valor = (item.gasto_valor || '').toString().replace(/,/g, '');
      return sum + (parseFloat(valor) || 0);
    }, 0);
  }

  updateCost(index: number, value: string) {
    if (!this.egressItems[index]) return;
  
    const cleanValue = (value || '').toString().replace(/,/g, '');
    
    this.egressItems[index].gasto_valor = cleanValue ? cleanValue : '0';
    
    this.calculateTotal();
  }
  
  deleteEgressItem(egress_id: any, item: any) {
    this.generalEgressService.deleteEgressItem(egress_id).subscribe({
      next: (response) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Gasto eliminado con éxito",
          showConfirmButton: false,
          timer: 1500
        });
        // Eliminar fila
        this.removeRow(item);
        this.globalEgressData.gasto_valor = this.totalCost.toString();
        this.globalEgressData.gasto_valor = this.formatToPesos(this.globalEgressData.gasto_valor);
      },
      error: (error) => {
        console.error('bad', error);
      },
    });
  }
  
  

  formatCurrency(event: any): void {
    const inputElement = event.target;

    const cleanValue = inputElement.value.replace(/[^0-9]/g, '');

    const formattedValue = this.formatToPesos(cleanValue);
    inputElement.value = formattedValue;
  }

  private formatToPesos(value: any): string {
    if (value === '') return '';

    const numberValue = parseInt(value, 10);
    const formattedValue = numberValue.toLocaleString('es-CO');

    // Reemplazar puntos por comas
    return formattedValue.replace(/\./g, ',');
  }
  OnSubmit() {
    this.formData = new FormData();

    this.formData.append('fo_egreso_viaje', this.route_id);
    if (this.globalEgressData.gasto_global === 1) {
      // Enviar los datos del globalEgressData
      this.formData.append('egreso_global', 1);
      this.formData.append('egreso_descripcion', this.globalEgressData.gasto_descripcion || '');
      let globalGastoValor = this.globalEgressData.gasto_valor?.toString().replace(/,/g, '') || '';
      this.formData.append('egreso_valor', parseFloat(globalGastoValor));
      let cleanedEgressItems = this.egressItems
      .filter(item => item.gasto_valor)  
      .map(item => {
        return {
          ...item,
          gasto_valor: item.gasto_valor ? item.gasto_valor.replace(/[^0-9]/g, '') : '0'
        };
      });
    
      (this.habilitarDetalle == true) ? this.formData.append('egressItems', JSON.stringify(cleanedEgressItems)) : this.formData.append('egressItems', '');

      if (this.habilitarDetalle === true && parseFloat(globalGastoValor) !== this.totalCost) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "El valor del coste final es diferente al total en el desgloce de gastos",
        });
        return;
      }
    } else if (this.globalEgressData.gasto_global === 0) {
      // Limpiar datos de las filas de egressItems y enviar solo breakdownEgressData
      this.egressItems = [{
        egreso_id: null,
        egreso_exogenable: '',
        fo_egreso_proveedor: '',
        gasto_descripcion: '',
        gasto_valor: null
      }];
      this.formData.append('egreso_global', 0);
      this.formData.append('egreso_exogenable', this.breakdownEgressData.egreso_exogenable.toString());
      this.formData.append('fo_egreso_proveedor', this.breakdownEgressData.fo_egreso_proveedor);
      this.formData.append('egreso_descripcion', this.breakdownEgressData.egreso_descripcion);
      let breakdownEgresoValor = this.breakdownEgressData.egreso_valor.toString().replace(/,/g, '');
      this.formData.append('egreso_valor', parseFloat(breakdownEgresoValor));
    }
    if (this.egress_id !== undefined) {
      this.formData.append('egreso_id', this.globalEgressData.gasto_global === 1 ? this.egress_id : this.breakdownEgressData.egreso_id);
      
      this.generalEgressService.updateEgress(this.formData, this.route_id).subscribe({
        next: (response) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Gasto actualizado con éxito",
            showConfirmButton: false,
            timer: 1500
          });
          this.generalEgressCreated.emit();
          this.dialogRef.close();
        },
        error: (error) => {
          console.error('bad', error);
        },
      });
    } else {
      this.generalEgressService.create_egress(this.route_id, this.formData).subscribe({
        next: (response) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Gasto creado  con éxito",
            showConfirmButton: false,
            timer: 1500
          });
          this.generalEgressCreated.emit();
          this.dialogRef.close();
        },
        error: (error) => {
          console.error('bad', error);
        },
      });
    }

  }


}
