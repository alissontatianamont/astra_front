import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-employees',
  templateUrl: './create-employees.component.html',
  styleUrls: ['./create-employees.component.scss']
})
export class CreateEmployeesComponent implements OnInit {
  startDate: Date;

  constructor() { }

  ngOnInit(): void {
  }

}
