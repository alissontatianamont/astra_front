import { Component, OnInit,EventEmitter , Output,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';
export interface EmployeeData {
  nombre_usuario: string,
  email: string,
  contrasena: string,
  estado_usuario: string,
  cedula: string,
  rol: string,
  telefono: string,
  fecha_contratacion:Date,
  avatar: string
}
@Component({
  selector: 'app-create-employees',
  templateUrl: './create-employees.component.html',
  styleUrls: ['./create-employees.component.scss']
})


export class CreateEmployeesComponent implements OnInit {
  base_api = environment.base;
  startDate: Date;
  file_user: File | null = null;
  formdata: any;
  id_user: any;
  hide = true;
  user: EmployeeData = {
    nombre_usuario: '',
    email: '',
    contrasena: '',
    estado_usuario: '',
    cedula: '',
    rol: '',
    telefono: '',
    fecha_contratacion: new Date(),
    avatar: ''
  };
  @Output() userCreated = new EventEmitter<void>();
  constructor(private authService: AuthService, private dialogRef: MatDialogRef<CreateEmployeesComponent>,@Inject(MAT_DIALOG_DATA) public data:any) {
    
 
    if (data?.id_user) {
      this.id_user = data.id_user;
      // console.log(this.id_user);
    }
   }
   togglePasswordVisibility() {
    this.hide = !this.hide;
  }
  ngOnInit(): void {
    
    
    if (this.id_user !== null) {
      
         this.authService.getUser(this.id_user).subscribe( (data: any) => {
      
      this.user = {
        nombre_usuario: data.nombre_usuario,
        email: data.email,
        contrasena: data.contrasena,
        estado_usuario: data.estado_usuario,
        cedula: data.cedula,
        rol: data.rol,
        telefono: data.telefono,
        fecha_contratacion: data.fecha_contratacion,
        avatar: `${this.base_api}images/profile/`+data.avatar
      };
    },);
    }
  }
getFile(event: any):any{
  const file = event.target.files[0];
  if (file) {
    this.file_user = file;
  }else{
    this.file_user = null;
  }
    
}


  OnSubmit(){
    let fecha = new Date(this.user.fecha_contratacion);
    let formatoFecha = new Intl.DateTimeFormat('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' });
    let fechaFormateada = formatoFecha.format(fecha);

    this.formdata = new FormData();
    if (this.file_user == null ) {
     // console.log("sin: "+this.file_user);
      this.formdata.append('avatar', this.user.avatar);
    } else {
      // console.log("con: "+this.file_user);
      this.formdata.append('avatar', this.file_user, this.file_user.name);

    }
    this.formdata.append("nombre_usuario", this.user.nombre_usuario);
    this.formdata.append("email", this.user.email);
    this.formdata.append("contrasena", this.user.contrasena);
    this.formdata.append("estado_usuario", this.user.estado_usuario);
    this.formdata.append("cedula", this.user.cedula);
    this.formdata.append("rol", this.user.rol);
    this.formdata.append("telefono", this.user.telefono);
    this.formdata.append("fecha_contratacion",fechaFormateada );
    
    // console.log(this.formdata);
    
    if (this.id_user !== undefined) {
      // console.log(this.id_user);
      
      this.authService.updateUser(this.formdata, this.id_user).subscribe({
        next:(response)=>{
          // console.log('good',response);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Usuario actualizado con éxito",
            showConfirmButton: false,
            timer: 1500
          });
          this.userCreated.emit();
          this.dialogRef.close();
        },
        error:(error)=>{
          console.error('bad',error);
        },
      })
    }else{
      this.authService.createUser(this.formdata).subscribe({
        next:(response)=>{
          // console.log(this.formdata);
          
          // console.log('good',response);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Usuario creado con éxito",
            showConfirmButton: false,
            timer: 1500
          });
          this.userCreated.emit();
          this.dialogRef.close();
        },
        error:(error)=>{
          console.error('bad',error);
        },
      })
    }
    
  }
}
