import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { CreateRoutesComponent } from 'src/app/modal_forms/create-routes/create-routes.component';
import { MatDialog } from '@angular/material/dialog';
import { ViewTravelComponent } from 'src/app/modal_views/view-travel/view-travel.component';

export interface UserData {
  id: string;
  employee: string;
  freight: string;
  route_travel: string;
}

@Component({
  selector: 'app-travels',
  templateUrl: 'travels.component.html',
  styleUrls: ['travels.component.scss']
})
export class TravelsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'employee', 'freight', 'route_travel', 'action'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient, public dialog: MatDialog) { }

  ngOnInit() {
    this.loadData();
  }

  openDialog() {
    const dialogRef = this.dialog.open(CreateRoutesComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openView() {
    const dialogView = this.dialog.open(ViewTravelComponent);

    dialogView.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  loadData() {
    // Cambia la ruta del archivo JSON según tu estructura de proyecto
    this.http.get<UserData[]>('./assets/data/data.json').subscribe(data => {
      this.dataSource = new MatTableDataSource(data);

      // Configura el paginador y el objeto de clasificación aquí, después de que los datos estén disponibles
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
