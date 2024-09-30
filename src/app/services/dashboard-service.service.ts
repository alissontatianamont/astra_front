import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class DashboardServiceService {
  base_api = environment.base;
  constructor(private http: HttpClient, private router: Router) { 

    
  }
  getCountRoutesByMonth(){
    return this.http.get(`${this.base_api}get_count_routes_by_month`);
  }
  
  getCountRoutesByUser(user_id: number){
    return this.http.get(`${this.base_api}get_count_routes_by_month_user/${user_id}`);
  }
  getEgressByMonth(){
    return this.http.get(`${this.base_api}get_egress_by_month`);
  }
  getEgressByUser(user_id: number){
    return this.http.get(`${this.base_api}get_egress_by_month_user/${user_id}`);
  }
  getProfitsByMonth(){
    return this.http.get(`${this.base_api}get_profits_by_month`);
  }
  getProfitsByUser(user_id: number){
    return this.http.get(`${this.base_api}get_profits_by_month_user/${user_id}`);
  }
  
}
