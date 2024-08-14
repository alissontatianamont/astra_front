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
}
