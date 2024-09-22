import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RoutesService } from 'src/app/services/routes.service';

@Component({
  selector: 'app-view-travel',
  templateUrl: './view-travel.component.html',
  styleUrls: ['./view-travel.component.scss']
})
export class ViewTravelComponent implements OnInit {
  route_id:number;
  driver_name: string;
  route_data: any = {};
  constructor(private routeService: RoutesService, @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data.route_id) {
      this.route_id = data.route_id;
    };
    
  }
  downloadSpreadsheet(file_name: string) {
    this.routeService.downloadSpreadsheet(file_name).subscribe((data: Blob) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = file_name; // O el nombre que desees para el archivo
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, error => {
      console.error('Error al descargar el archivo:', error);
    });
  }
  
  ngOnInit(): void {
    this.routeService.getRoute(this.route_id).subscribe((data: any) => {
      this.route_data = data;
      console.log(this.route_data.viaje_fecha_llegada);
      
      // Ahora que tenemos route_data, podemos llamar a getDriverName
      if (this.route_data.fo_viaje_usuario) {
        this.routeService.getDriverName(this.route_data.fo_viaje_usuario).subscribe((driverData: any) => {
          this.driver_name = driverData;
        }, error => {
          console.error('Error al cargar el nombre del conductor:', error);
        });
      } else {
        console.warn('fo_viaje_usuario no está disponible');
      }
    }, error => {
      console.error('Error al cargar la ruta:', error);
    });
  }
  

}
