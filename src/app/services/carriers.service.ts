import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CarriersService {
  base_api = environment.base;
  constructor(private http: HttpClient, private router: Router) { }

  getCarriers(){
    return this.http.get(`${this.base_api}carriers`); 
  }
  createCarrier(carrier: any): Observable<any>{
    return this.http.post(`${this.base_api}create_carrier`, carrier);
  }
  getCarrier(carrier_id: number){
    return this.http.get(`${this.base_api}get_carrier/${carrier_id}`); 
  }
  updateCarrier(carrier_id: number, carrier:any) : Observable<any> {
    return this.http.post(`${this.base_api}update_carrier/${carrier_id}`, carrier);
  }
  deleteCarrier(carrier_id: number): Observable<any>{
    return this.http.post(`${this.base_api}delete_carrier/${carrier_id}`, carrier_id);
  }
}
