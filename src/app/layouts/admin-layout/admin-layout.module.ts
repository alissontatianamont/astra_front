import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AdminLayoutRoutes } from "./admin-layout.routing";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { CarriersComponent } from "src/app/pages/carriers/carriers.component";
import { ViewCarrierComponent } from "src/app/modal_views/view-carrier/view-carrier.component";
import { UserComponent } from "../../pages/user/user.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatFormFieldModule } from "@angular/material/form-field";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from "@angular/material/sort";
import { TravelsComponent } from "src/app/pages/travels/travels.component";
import { EmployeesComponent } from "src/app/pages/employees/employees.component";
import { MatNativeDateModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import { ReportsComponent } from "src/app/pages/reports/reports.component";
import {MatDialogModule} from '@angular/material/dialog';
import { CreateRoutesComponent } from "src/app/modal_forms/create-routes/create-routes.component";
import {MatTabsModule} from '@angular/material/tabs';
import { CreateCarriersComponent } from "src/app/modal_forms/create-carriers/create-carriers.component";
import { ViewTravelComponent } from "src/app/modal_views/view-travel/view-travel.component";
import { CreateEmployeesComponent } from "src/app/modal_forms/create-employees/create-employees.component";
import { ViewEmployeeComponent } from "src/app/modal_views/view-employee/view-employee.component";
import { CertificationsComponent } from "src/app/pages/certifications/certifications.component";
import { CKEditorModule } from 'ckeditor4-angular';
import { AuthInterceptor } from "../../auth.interceptor";
import { AuthService } from "src/app/services/auth.service";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSortModule, 
    MatMenuModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDialogModule,
    MatTabsModule,
    CKEditorModule
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    EmployeesComponent,
    TravelsComponent,
    CarriersComponent,
    ReportsComponent,
    CreateRoutesComponent,
    ViewCarrierComponent,
    CreateCarriersComponent,
    ViewTravelComponent,
    CreateEmployeesComponent,
    ViewEmployeeComponent,
    CertificationsComponent
  ],
  // exports: [CreateRoutesComponent],
  providers: [AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  
})
export class AdminLayoutModule {

}
