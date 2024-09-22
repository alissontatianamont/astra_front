import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { ExogenousService } from 'src/app/services/exogenous.service';
import Swal from 'sweetalert2';

export interface ExogenousData {
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
  exogena_tipo: number;
  exogena_estatus: string;
}
@Component({
  selector: 'app-create-exogenous',
  templateUrl: './create-exogenous.component.html',
  styleUrls: ['./create-exogenous.component.scss']
})
export class CreateExogenousComponent implements OnInit {
  exogenous_id: any;
  formData: any;
  exogenous_data: ExogenousData = {
    exogena_nit: '',
    exogena_dv: '',
    exogena_nombre1: '',
    exogena_nombre2: '',
    exogena_apellido1: '',
    exogena_apellido2: '',
    exogena_razon_social: '',
    exogena_direccion: '',
    exogena_ciudad: '',
    exogena_departamento: '',
    exogena_tipo: null,
    exogena_estatus: '',
  }
  constructor(private dialogRef: MatDialogRef<CreateExogenousComponent>, private exogenousService: ExogenousService, @Inject(MAT_DIALOG_DATA) public exogenous_data_id: any) {
    if (exogenous_data_id?.exogenous_id) {
      this.exogenous_id = exogenous_data_id.exogenous_id;
      //  console.log(this.exogenous_id);
    }
  }
  @Output() exogenousCreated = new EventEmitter<void>();
  onSelectionChange(event: MatSelectChange) {
    this.exogenous_data.exogena_tipo = +event.value; // Convertir a número
  }

  ngOnInit(): void {
    if (this.exogenous_id !== undefined) {
      this.exogenousService.getExogenousOne(this.exogenous_id).subscribe((data: any) => {
        // console.log("data ", data.exogena_tipo);

        this.exogenous_data = {
          exogena_nit: data.exogena_nit,
          exogena_dv: data.exogena_dv,
          exogena_nombre1: data.exogena_nombre1,
          exogena_nombre2: data.exogena_nombre2,
          exogena_apellido1: data.exogena_apellido1,
          exogena_apellido2: data.exogena_apellido2,
          exogena_razon_social: data.exogena_razon_social,
          exogena_direccion: data.exogena_direccion,
          exogena_ciudad: data.exogena_ciudad,
          exogena_departamento: data.exogena_departamento,
          exogena_tipo: data.exogena_tipo,
          exogena_estatus: data.exogena_estatus,
        }
        // this.exogenous_data.exogena_tipo = +this.exogenous_data.exogena_tipo;
        // console.log(this.exogenous_data.exogena_tipo);

      });
    }
  }

  OnSubmit() {
    this.formData = new FormData();
    this.formData.append('exogena_nit', this.exogenous_data.exogena_nit);
    this.formData.append('exogena_dv', this.exogenous_data.exogena_dv);
    this.formData.append('exogena_razon_social', this.exogenous_data.exogena_razon_social || '');
    this.formData.append('exogena_nombre1', this.exogenous_data.exogena_nombre1 || '');
    this.formData.append('exogena_nombre2', this.exogenous_data.exogena_nombre2 || '');
    this.formData.append('exogena_apellido1', this.exogenous_data.exogena_apellido1 || '');
    this.formData.append('exogena_apellido2', this.exogenous_data.exogena_apellido2 || '');
    this.formData.append('exogena_direccion', this.exogenous_data.exogena_direccion);
    this.formData.append('exogena_ciudad', this.exogenous_data.exogena_ciudad);
    this.formData.append('exogena_departamento', this.exogenous_data.exogena_departamento);
    this.formData.append('exogena_tipo', this.exogenous_data.exogena_tipo);
    this.formData.append('exogena_estatus', 1);
    if (this.exogenous_id !== undefined) {
      this.exogenousService.updateExogenous(this.exogenous_id, this.formData).subscribe({
        next: (response) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Información exógena editada con éxito",
            showConfirmButton: false,
            timer: 1500
          });
          this.exogenousCreated.emit();
          this.dialogRef.close();
        },
        error: (error) => {
          console.error('bad', error);
        },
      });
    } else {
      this.exogenousService.createExogenous(this.formData).subscribe({
        next: (response) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Información exógena creada con éxito",
            showConfirmButton: false,
            timer: 1500
          });
          this.exogenousCreated.emit();
          this.dialogRef.close();
        },
        error: (error) => {
          console.error('bad', error);
        },
      });
    }

  }

}
