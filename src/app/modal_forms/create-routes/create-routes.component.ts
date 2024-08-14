import { Component, Inject, Output, EventEmitter, OnInit  } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { RoutesService } from 'src/app/services/routes.service';
import Swal from 'sweetalert2';

export interface RouteData {
  viaje_num_manifiesto: string,
  viaje_fecha_manifiesto: Date,
  viaje_placa: string,
  viaje_destino_inicio: string,
  viaje_destino_llegada: string,
  viaje_fecha_inicio: Date,
  viaje_km_salida: string,
  viaje_km_llegada: string,
  fo_viaje_usuario: string,
  viaje_planilla: string,
  viaje_flete: string,
  viaje_anticipo: string,
  viaje_sobrecosto: string,
  viaje_total_ganancias: string,
  viaje_porcentaje_conductor: string,
  viaje_observaciones: string,
  viaje_peso: string,
  viaje_estatus: string,
  viaje_neto_pago: string
}
@Component({
  selector: 'app-create-routes',
  templateUrl: './create-routes.component.html',
  styleUrls: ['./create-routes.component.scss']
})
export class CreateRoutesComponent implements OnInit{

  startDate: Date;
  file_planilla: File | null = null;
  formData : any;
  userId : any;
  viaje_id: any; 
  drivers: any[] = [];
  routes: RouteData = {
    viaje_num_manifiesto: '',
    viaje_fecha_manifiesto: new Date(),
    viaje_placa: '',
    viaje_destino_inicio: '',
    viaje_destino_llegada: '',
    viaje_fecha_inicio: new Date(),
    viaje_km_salida: '',
    viaje_km_llegada: '',
    fo_viaje_usuario: '',
    viaje_planilla: '',
    viaje_flete: '',
    viaje_anticipo: '',
    viaje_sobrecosto: '',
    viaje_neto_pago: '',
    viaje_total_ganancias: '',
    viaje_porcentaje_conductor: '',
    viaje_observaciones: '',
    viaje_peso: '',
    viaje_estatus: ''
  };
  @Output() routeCreated = new EventEmitter<void>();
  constructor(private routesService: RoutesService, private dialogRef: MatDialogRef<CreateRoutesComponent>,@Inject(MAT_DIALOG_DATA) public data:any, private authService: AuthService) {
    this.userId = this.authService.getUserId();
    console.log('Usuario ID:', this.userId);
    if (data?.viaje_id) {
      this.viaje_id = data.viaje_id;
      console.log(this.viaje_id);
    }
    
  }
  getFile(event: any):any{
    const file = event.target.files[0];
    if (file) {
      this.file_planilla = file;
    }else{
      this.file_planilla = null;
    }
      
  }
  getUsers(): void {
    this.routesService.getDrivers().subscribe((data: any) => {
      this.drivers = data;
    });
  }
  ngOnInit(): void {
    this.getUsers();
    this.userId = this.authService.getUserId(); 
    this.routes.fo_viaje_usuario = this.userId;
    if (this.viaje_id !== null) {
      this.routesService.getRoute(this.viaje_id).subscribe((data:any)=>{
        // console.log(data);
        this.routes = {
          viaje_num_manifiesto: data.viaje_num_manifiesto,
          viaje_fecha_manifiesto: data.viaje_fecha_manifiesto,
          viaje_placa: data.viaje_placa,
          viaje_destino_inicio: data.viaje_destino_inicio,
          viaje_destino_llegada: data.viaje_destino_llegada,
          viaje_fecha_inicio: data.viaje_fecha_inicio,
          viaje_km_salida: data.viaje_km_salida,
          viaje_km_llegada: data.viaje_km_llegada,
          fo_viaje_usuario: data.fo_viaje_usuario,
          viaje_planilla: data.viaje_planilla,
          viaje_flete: data.viaje_flete,
          viaje_anticipo: data.viaje_anticipo,
          viaje_sobrecosto: data.viaje_sobrecosto,
          viaje_neto_pago: data.viaje_neto_pago,
          viaje_total_ganancias: data.viaje_total_ganancias,
          viaje_porcentaje_conductor: data.viaje_porcentaje_conductor,
          viaje_observaciones: data.viaje_observaciones,
          viaje_peso: data.viaje_peso,
          viaje_estatus: data.viaje_estatus
        }
      });
      
    }
  }
  OnSubmit(){
    //fecha manifiesto
    let fecha_manifiesto = new Date(this.routes.viaje_fecha_manifiesto);
    let formatoFecha_manifiesto = new Intl.DateTimeFormat('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' });
    let fechaFormateada_manifiesto = formatoFecha_manifiesto.format(fecha_manifiesto);
    //fecha salida
    let fecha_inicio = new Date(this.routes.viaje_fecha_inicio);
    let formatoFecha_inicio = new Intl.DateTimeFormat('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' });
    let fechaFormateada_inicio = formatoFecha_inicio.format(fecha_inicio);
    this.formData = new FormData();
    if (this.file_planilla == null ) {
     // console.log("sin: "+this.file_routes);
      this.formData.append('viaje_planilla', this.routes.viaje_planilla);
    } else {
      // console.log("con: "+this.file_routes);
      this.formData.append('viaje_planilla', this.file_planilla, this.file_planilla.name);

    }
    this.formData.append("viaje_num_manifiesto", this.routes.viaje_num_manifiesto);
    this.formData.append("viaje_fecha_manifiesto", fechaFormateada_manifiesto);
    this.formData.append("viaje_placa", this.routes.viaje_placa);
    this.formData.append("fo_viaje_usuario", this.routes.fo_viaje_usuario);
    this.formData.append("viaje_destino_inicio", this.routes.viaje_destino_inicio);
    this.formData.append("viaje_destino_llegada", this.routes.viaje_destino_llegada);
    this.formData.append("viaje_fecha_inicio",  fechaFormateada_inicio);
    this.formData.append("viaje_km_salida", this.routes.viaje_km_salida);
    this.formData.append("viaje_km_llegada",this.routes.viaje_km_llegada );
    this.formData.append("viaje_flete",this.routes.viaje_flete );
    this.formData.append("viaje_anticipo",this.routes.viaje_anticipo );
    this.formData.append("viaje_neto_pago",this.routes.viaje_neto_pago );
    this.formData.append("viaje_sobrecosto",this.routes.viaje_sobrecosto );
    this.formData.append("viaje_total_ganancias",this.routes.viaje_total_ganancias );
    this.formData.append("viaje_porcentaje_conductor",this.routes.viaje_porcentaje_conductor );
    this.formData.append("viaje_observaciones",this.routes.viaje_observaciones );
    this.formData.append("viaje_peso",this.routes.viaje_peso );
    this.formData.append("viaje_estatus", 1 );
    // console.log(this.formData);
    // return;
    if(this.viaje_id !== undefined){
      // console.log(this.formData);
      // return;
        this.routesService.editRoute(this.formData, this.viaje_id).subscribe({
          next:(response)=>{
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Ruta actualizada con éxito",
              showConfirmButton: false,
              timer: 1500
            });
            this.routeCreated.emit();
            this.dialogRef.close();
          },
          error:(error)=>{
            console.error('bad',error);
          },
        });
    }else{
      // console.log(this.formData);
      // return;
      this.routesService.createRoute(this.formData).subscribe({

        next:(response)=>{
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Ruta creada con éxito",
            showConfirmButton: false,
            timer: 1500
          });
          this.routeCreated.emit();
          this.dialogRef.close();
        },
        error:(error)=>{
          console.error('bad',error);
        },
      });
    }

    
  }
}
