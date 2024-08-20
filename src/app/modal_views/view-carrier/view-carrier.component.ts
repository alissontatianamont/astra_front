import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CarriersService } from 'src/app/services/carriers.service';


export interface CarrierData {
  transportadora_departamento: string;
  transportadora_ciudad: string;
  transportadora_direccion: string;
  transportadora_dv: string;
  transportadora_nit: string;
  transportadora_razon_social: string;
  transportadora_telefono: string;
}
@Component({
  selector: 'app-view-carrier',
  templateUrl: './view-carrier.component.html',
  styleUrls: ['./view-carrier.component.scss']
})

export class ViewCarrierComponent implements OnInit {
  carrierData : CarrierData = {
    transportadora_departamento: '',
    transportadora_ciudad: '',
    transportadora_direccion: '',
    transportadora_dv: '',
    transportadora_nit: '',
    transportadora_razon_social: '',
    transportadora_telefono: '',
  }
 carrier_id : number;
  constructor(private carrierService: CarriersService, @Inject(MAT_DIALOG_DATA) public data:any) { 
    this.carrier_id = data.carrier_id;
  }

  ngOnInit(): void {
    this.carrierService.getCarrier(this.carrier_id).subscribe((data:any)=>{
      this.carrierData ={
        transportadora_departamento: data.transportadora_departamento,
        transportadora_ciudad: data.transportadora_ciudad,
        transportadora_direccion: data.transportadora_direccion,
        transportadora_dv: data.transportadora_dv,
        transportadora_nit: data.transportadora_nit,
        transportadora_razon_social: data.transportadora_razon_social,
        transportadora_telefono: data.transportadora_telefono,
      }
        console.log(data);
    });
  }

}
