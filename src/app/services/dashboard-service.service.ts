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
  getEgressByMonth(){
    return this.http.get(`${this.base_api}get_egress_by_month`);
  }
  getProfitsByMonth(){
    return this.http.get(`${this.base_api}get_profits_by_month`);
  }
  
}
