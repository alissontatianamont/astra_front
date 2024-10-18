import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ToastrModule } from 'ngx-toastr';
import { AuthService } from "./services/auth.service";
import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppRoutingModule } from "./app-routing.module";
import { ComponentsModule } from "./components/components.module";
import { AuthInterceptor } from "./auth.interceptor";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { LoginComponent } from './pages/login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { MatOptionModule } from '@angular/material/core';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  
  imports: [
    BrowserModule,
    MatOptionModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule
  ],
  declarations: [AppComponent, AdminLayoutComponent, LoginComponent],
  providers: [AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {}
