import { Component, OnInit, Output,EventEmitter, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CarriersService } from 'src/app/services/carriers.service';

import Swal from 'sweetalert2';

export interface CarriersData {
  transportadora_razon_social: string;
  transportadora_nit: string;
  transportadora_direccion: string;
  transportadora_telefono: string;
  transportadora_dv: string;
  transportadora_ciudad:string;
  transportadora_departamento:string;
  transportadora_estatus:string;
}

@Component({
  selector: 'app-create-carriers',
  templateUrl: './create-carriers.component.html',
  styleUrls: ['./create-carriers.component.scss']
})
export class CreateCarriersComponent implements OnInit {
  formData : any;
  carrier_id: any;
  carriers: CarriersData = {
  transportadora_razon_social: '',
  transportadora_nit: '',
  transportadora_direccion: '',
  transportadora_telefono: '',
  transportadora_dv: '',
  transportadora_ciudad:'',
  transportadora_departamento:'',
  transportadora_estatus:'',
  };
  
  constructor(private carriersService: CarriersService, private dialogRef: MatDialogRef<CreateCarriersComponent>,@Inject(MAT_DIALOG_DATA) public carrier_data_id:any) { 

    if (carrier_data_id?.carrier_id) {
      this.carrier_id = carrier_data_id.carrier_id;
      // console.log(this.carrier_id);
    }
    console.log(this.carrier_id);
  }
  @Output() carrierCreated = new EventEmitter<void>();
  ngOnInit(): void {
    if(this.carrier_id !== undefined){
      this.carriersService.getCarrier(this.carrier_id).subscribe((data:any)=>{
        console.log(data);
        
        this.carriers ={
          transportadora_razon_social: data.transportadora_razon_social,
          transportadora_nit: data.transportadora_nit,
          transportadora_direccion: data.transportadora_direccion,
          transportadora_telefono: data.transportadora_telefono,
          transportadora_dv: data.transportadora_dv,
          transportadora_ciudad:data.transportadora_ciudad,
          transportadora_departamento:data.transportadora_departamento,
          transportadora_estatus:data.transportadora_estatus,
        }
      });
    }
  }
OnSubmit(){
  this.formData = new FormData();
  this.formData.append('transportadora_razon_social', this.carriers.transportadora_razon_social);
  this.formData.append('transportadora_nit', this.carriers.transportadora_nit);
  this.formData.append('transportadora_direccion', this.carriers.transportadora_direccion);
  this.formData.append('transportadora_telefono', this.carriers.transportadora_telefono);
  this.formData.append('transportadora_dv', this.carriers.transportadora_dv);
  this.formData.append('transportadora_ciudad', this.carriers.transportadora_ciudad);
  this.formData.append('transportadora_departamento', this.carriers.transportadora_departamento);
  this.formData.append('transportadora_estatus', 1);
  // console.log(this.formData);
  // return;
  if(this.carrier_id !== undefined){
    this.carriersService.updateCarrier(this.carrier_id, this.formData).subscribe({
      next:(response)=>{
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Transportadora actualizada con éxito",
          showConfirmButton: false,
          timer: 1500
        });
        this.carrierCreated.emit();
        this.dialogRef.close();
      },
      error:(error)=>{
        console.error('bad',error);
      },
    });
  }else{
    this.carriersService.createCarrier(this.formData).subscribe({
      next:(response)=>{
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Transportadora creada con éxito",
          showConfirmButton: false,
          timer: 1500
        });
        this.carrierCreated.emit();
        this.dialogRef.close();
      },
      error:(error)=>{
        console.error('bad',error);
      },
    });
  }

  
}
}
