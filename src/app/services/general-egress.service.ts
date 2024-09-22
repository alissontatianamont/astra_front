import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class GeneralEgressService {
  base_api = environment.base;
  constructor(private http: HttpClient) {

  }

  create_egress(viaje_id: any, form_data: any): Observable<any> {
    return this.http.post(`${this.base_api}create_egress/${viaje_id}`, form_data);
  }
  getEgress(viaje_id:any){
    return this.http.get(`${this.base_api}get_egress/${viaje_id}`);
  }
  getSingleEgress(viaje_id:any){
    return this.http.get(`${this.base_api}get_single_egress/${viaje_id}`);
  }
  showOrFetchGlobalEgress(viaje_id:any){
    return this.http.get(`${this.base_api}show_or_fetch_global_egress/${viaje_id}`);
  }
  getOneGlobalEgress(egress_id:any){
    return this.http.get(`${this.base_api}get_one_global_egress/${egress_id}`);
  }
  getOneSingleEgress(egress_id:any){
    return this.http.get(`${this.base_api}get_one_single_egress/${egress_id}`);
  }
  updateEgress( form_data:any, viaje_id:any){
    return this.http.post(`${this.base_api}update_egress/${viaje_id}`, form_data);
  }
  deleteSingleEgress(viaje_id:any, egress_id:any){
    return this.http.delete(`${this.base_api}delete_single_egress/${viaje_id}/${egress_id}`);
  }
  deleteEgressItem(egress_id:any){
    return this.http.delete(`${this.base_api}delete_egress_item/${egress_id}`);
  }
  deleteGlobalEgress(egress_id:any){
    return this.http.delete(`${this.base_api}delete_global_egress/${egress_id}`);
  }
}
