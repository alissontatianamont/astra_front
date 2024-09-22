import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RoutesService {
  base_api = environment.base;
  constructor(private http: HttpClient, private router: Router) { }

  getRoutes(){
    return this.http.get(`${this.base_api}routes`);
  }
  getRoutesByUser(user_id){
    return this.http.get(`${this.base_api}get_routes_by_user/${user_id}`);
  }
  createRoute(route: any ): Observable<any>{
    return this.http.post(`${this.base_api}create_route`, route);
  }
  getDrivers(){
    return this.http.get(`${this.base_api}get_drivers`);
  }
  getRoute(viaje_id){
    return this.http.get(`${this.base_api}get_route/${viaje_id}`);
  }
  editRoute(user: any, viaje_id): Observable<any>{
    return this.http.post(`${this.base_api}update_route/${viaje_id}`, user);
  }
  deleteRoute(viaje_id: any): Observable<any>{
    return this.http.post(`${this.base_api}delete_route/${viaje_id}`, viaje_id);
  }
  downloadSpreadsheet(file_name: string) {
    return this.http.get(`${this.base_api}download_spreadsheet/${file_name}`, { responseType: 'blob' });
  }
  getDriverName(user_id){
    return this.http.get(`${this.base_api}get_driver_name/${user_id}`);
  }
  finishRoute(viaje_id: any): Observable<any>{
    return this.http.post(`${this.base_api}finish_route/${viaje_id}`, viaje_id);
  }
  
}
