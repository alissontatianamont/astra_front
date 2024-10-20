import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-user",
  templateUrl: "user.component.html"
})
export class UserComponent implements OnInit {
  startDate: Date;
  user_data : any = [];
  avatarName: any;
  hide = true;
  formdata: any;
  user_id: any;
  imageSrc: any;
  constructor(private authService: AuthService) {}
  
  getImageUrl() {
    this.authService.getAvatarUser(this.avatarName).subscribe((data: any) => {
      this.imageSrc = data.url;
    }, error => {
      console.error('Error al cargar la imagen:', error);
    });
  }
  togglePasswordVisibility() {
    this.hide = !this.hide;
  }
  onSubmit() {
  
    if (this.user_data.contrasena) {

      this.user_data.password = this.user_data.contrasena;
    }else{
      delete this.user_data.password;
    }
  
    delete this.user_data.contrasena;
  

    this.formdata = new FormData();

    for (const key in this.user_data) {
      if (this.user_data.hasOwnProperty(key)) {
        this.formdata.append(key, this.user_data[key]);
      }
    }

    // Llama al servicio para actualizar el usuario
    this.authService.updateProfile(this.formdata, this.user_id).subscribe({
      next: response => {
        Swal.fire({
          title: 'Usuario actualizado',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#3f51b5'
        });
      },
      error: error => {
        // Manejo de errores
        console.error('Error al actualizar el usuario:', error);
      }
    });
  }

  ngOnInit() {
    this.user_id = localStorage.getItem('usuario_id');
    
    this.authService.getUser(this.user_id).subscribe((data:any)=>{
      this.user_data = data;
      this.avatarName = this.user_data.avatar;
      this.getImageUrl();
    });
    
  }
}
