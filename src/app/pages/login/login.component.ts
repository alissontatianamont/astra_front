import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
email = '';
password = '';
  constructor(private authService:AuthService, private router: Router ) { }

  ngOnInit(): void {
  }
login(){
  this.authService.login(this.email, this.password).subscribe(
    response =>{
      localStorage.setItem('accessToken', response.accessToken);
      console.log( response.accessToken);
      
      this.router.navigate(['/dashboard']);
    },
    error=>{
      alert('el loguin falló')
    }
  );
}
}
