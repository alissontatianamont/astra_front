import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ExogenousService {
  base_api = environment.base;
  constructor(private http: HttpClient, private router: Router) { }

  getExogenous(){
    return this.http.get(`${this.base_api}exogenous`);
  }
  createExogenous(exogenous: any): Observable<any>{
    return this.http.post(`${this.base_api}create_exogenous`,exogenous);
  }
  getExogenousOne(exogenous_id: any){
    return this.http.get(`${this.base_api}get_exogenous/${exogenous_id}`);
  }
  updateExogenous(exogenous_id: any, exogenous: any): Observable<any> {
    return this.http.post(`${this.base_api}update_exogenous/${exogenous_id}`,exogenous);
  }
  deleteExogenous(exogenous_id: any) : Observable <any>{
    return this.http.post(`${this.base_api}delete_exogenous/${exogenous_id}`,exogenous_id);
  }
  getExogenousSelect(){
    return this.http.get(`${this.base_api}get_exogenous_select`);
  }
}
