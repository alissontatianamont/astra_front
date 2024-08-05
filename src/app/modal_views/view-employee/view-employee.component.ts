import { Component, OnInit,Inject  } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

export interface EmployeeData {
  employee: string;
  id_card: string;
  position: string;
  status: string;
  email: string;
  phone: string;
  avatar: string;
}

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.scss']
})

export class ViewEmployeeComponent implements OnInit {
  base_api = environment.base;
  employeeData: EmployeeData = {
    employee: '',
    id_card: '',
    position: '',
    status: '',
    email: '',
    phone: '',
    avatar: ''
  };
  id_user: any;
  email: string;
  avatarName: any;
  imageSrc: any;

  constructor(private authService: AuthService, private http: HttpClient,@Inject(MAT_DIALOG_DATA) public data:any) { 
    this.id_user = data.id_user;
    this.avatarName = data.avatar_user;
    
    
    
  }
  
  getImageUrl() {
    this.authService.getAvatarUser(this.avatarName).subscribe((data: any) => {
      this.imageSrc = data.url;
    }, error => {
      console.error('Error al cargar la imagen:', error);
    });
  }

  ngOnInit(): void {

    this.authService.getUser(this.id_user).subscribe( (data: any) => {
      this.employeeData = {
        email: data.email,
        id_card: data.cedula,
        employee: data.nombre_usuario,
        status: data.estado_usuario,
        phone: data.telefono,
        position: data.rol,
        avatar: data.avatar
      };
      this.avatarName = data.avatar;
      this.getImageUrl();
    },);
    
    
  }

}
