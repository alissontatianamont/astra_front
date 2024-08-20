import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import {  TravelsComponent } from "../../pages/travels/travels.component";
import { UserComponent } from "../../pages/user/user.component";
import { EmployeesComponent } from "src/app/pages/employees/employees.component";
import { ReportsComponent } from "src/app/pages/reports/reports.component";
import { CertificationsComponent } from "src/app/pages/certifications/certifications.component";
import { CarriersComponent } from "src/app/pages/carriers/carriers.component";


export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "travels", component: TravelsComponent },
  { path: "carriers", component: CarriersComponent },
  { path: "user", component: UserComponent },
  { path: "employees", component: EmployeesComponent },
  { path: "reports", component: ReportsComponent },
  {path: "certifications", component: CertificationsComponent},
  
];
