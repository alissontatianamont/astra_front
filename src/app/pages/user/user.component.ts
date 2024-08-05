import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-user",
  templateUrl: "user.component.html"
})
export class UserComponent implements OnInit {
  startDate: Date;
  users= [];
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getUsers().subscribe((data:any)=>{
      this.users = data;
    }) 
  }
}
