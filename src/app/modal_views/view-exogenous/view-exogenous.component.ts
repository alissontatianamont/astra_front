import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExogenousService } from 'src/app/services/exogenous.service';
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
  selector: 'app-view-exogenous',
  templateUrl: './view-exogenous.component.html',
  styleUrls: ['./view-exogenous.component.scss']
})
export class ViewExogenousComponent implements OnInit {
  exogenous_id: any;
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
  constructor( private exogenousService: ExogenousService,  @Inject(MAT_DIALOG_DATA) public exogenous_data_id: any) {
    this.exogenous_id = exogenous_data_id.exogenous_id;

   }
  getDisplayName(exogenous_data: any): string {
    if (exogenous_data.exogena_razon_social) {
      return exogenous_data.exogena_razon_social;
    } else {
      const nombre1 = exogenous_data.exogena_nombre1 || '';
      const nombre2 = exogenous_data.exogena_nombre2 || '';
      const apellido1 = exogenous_data.exogena_apellido1 || '';
      const apellido2 = exogenous_data.exogena_apellido2 || '';
      return [nombre1, nombre2, apellido1, apellido2].filter(val => val).join(' ');
    }
  }
  ngOnInit(): void {
    this.exogenousService.getExogenousOne(this.exogenous_id).subscribe((data:any)=>{
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
    });
  }

}
