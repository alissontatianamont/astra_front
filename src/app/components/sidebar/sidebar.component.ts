import { Component, OnInit } from "@angular/core";

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export let ROUTES: RouteInfo[] = [
  {
    path: "/dashboard",
    title: "Dashboard",
    icon: "icon-chart-pie-36",
    class: ""
  },
  {
    path: "/travels",
    title: "Viajes",
    icon: "icon-square-pin",
    class: ""
  },
  {
    path: "/exogenous",
    title: "Empresas exógenas",
    icon: "icon-square-pin",
    class: ""
  },
  {
    path: "/carriers",
    title: "Transportadoras",
    icon: "icon-square-pin",
    class: ""
  },
  {
    path: "/employees",
    title: "Empleados",
    icon: "icon-single-02",
    class: ""
  },
  {
    path: "/reports",
    title: "Informes",
    icon: "icon-single-copy-04",
    class: ""
  },
  {
    path: "/user",
    title: "Mi perfil",
    icon: "icon-badge",
    class: ""
  },
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit {
  menuItems: RouteInfo[] = [];

  constructor() {}

  ngOnInit() {
    this.updateMenuItems(); // Llamar al método para actualizar las rutas
  }

  updateMenuItems() {
    const rol_user = JSON.parse(localStorage.getItem('rol')) || 0; // Obtener el rol del localStorage, o 0 si no hay rol

    const allRoutes = [...ROUTES]; // Copiar las rutas originales

    if (rol_user === 1) {
      // Filtrar las rutas solo para rol 1
      this.menuItems = allRoutes.filter(route => 
        route.path === '/dashboard' || 
        route.path === '/travels' || 
        route.path === '/user'
      );
    } else {
      this.menuItems = allRoutes; // Mostrar todas las rutas para otros roles
    }
  }

  isMobileMenu() {
    return window.innerWidth <= 991;
  }
}
