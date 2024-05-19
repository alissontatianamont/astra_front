import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from "./app-routing.module";
import { ComponentsModule } from "./components/components.module";

import { CertificationsComponent } from './pages/certifications/certifications.component';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { CreateEmployeesComponent } from './modal_forms/create-employees/create-employees.component';
import { ViewEmployeeComponent } from './modal_views/view-employee/view-employee.component';
import { LoginComponent } from './pages/login/login.component';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  declarations: [AppComponent, AdminLayoutComponent, LoginComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
