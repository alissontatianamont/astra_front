import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  base_api = environment.base;
  constructor(private http: HttpClient) {

  }

  getReportsName(){
    return this.http.get(`${this.base_api}get_reports_name`);
  }
  getReportData(rep_id, startDate,startEnd){
    return this.http.get(`${this.base_api}get_report/${rep_id}/${startDate}/${startEnd}`);
  }
  downloadReport(rep_id, startDate, startEnd){
    return this.http.get(`${this.base_api}download_report/${rep_id}/${startDate}/${startEnd}`, { responseType: 'blob' });
  }
  downloadExogenousReport(){
    return this.http.get(`${this.base_api}download_exogenous_report`, { responseType: 'blob' });
  }
}
