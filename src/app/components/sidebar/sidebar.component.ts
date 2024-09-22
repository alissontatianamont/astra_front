import { Component, OnInit } from "@angular/core";

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
let rol_user = JSON.parse(localStorage.getItem('rol'));

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

// Filtrar rutas según el rol del usuario
const allRoutes = [...ROUTES]; // Copiar las rutas originales

if (rol_user == 1) {
  ROUTES = allRoutes.filter(route => 
    route.path === '/dashboard' || 
    route.path === '/travels' || 
    route.path === '/user'
  );
}


@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() {}

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }
}
