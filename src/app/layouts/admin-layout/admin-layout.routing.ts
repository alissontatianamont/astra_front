import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import {  TravelsComponent } from "../../pages/travels/travels.component";
import { UserComponent } from "../../pages/user/user.component";
import { ExogenousComponent } from "src/app/pages/exogenous/exogenous.component";
import { EmployeesComponent } from "src/app/pages/employees/employees.component";
import { ReportsComponent } from "src/app/pages/reports/reports.component";
import { CarriersComponent } from "src/app/pages/carriers/carriers.component";
import { RoleGuard } from "src/app/auth/rol-access.guard";

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "exogenous", component: ExogenousComponent, canActivate: [RoleGuard], data: { expectedRole: '2' } },
  { path: "travels", component: TravelsComponent },
  { path: "carriers", component: CarriersComponent, canActivate: [RoleGuard], data: { expectedRole: '2' } },
  { path: "user", component: UserComponent },
  { path: "employees", component: EmployeesComponent, canActivate: [RoleGuard], data: { expectedRole: '2' } },
  { path: "reports", component: ReportsComponent, canActivate: [RoleGuard], data: { expectedRole: '2' } },
  
];
