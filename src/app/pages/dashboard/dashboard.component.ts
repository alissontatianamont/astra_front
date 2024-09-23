import { Component, OnInit } from "@angular/core";
import Chart from 'chart.js';
import { DashboardServiceService } from "src/app/services/dashboard-service.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "dashboard.component.html"
})
export class DashboardComponent implements OnInit {
  constructor(private dashboardService: DashboardServiceService) {}
  public canvas : any;
  public ctx;
  public datasets: any;
  public data: any;
  rol_user: any;
  // localStorage.getItem('usuario_id')
  public myChartData;

  
  ngOnInit() { 
    this.rol_user = JSON.parse(localStorage.getItem('rol'));
    //grafica roja
    var gradientChartOptionsConfigurationWithTooltipRed: any = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.0)',
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 60,
            suggestedMax: 125,
            padding: 20,
            fontColor: "#9a9a9a"
          }
        }],

        xAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(233,32,16,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#9a9a9a"
          }
        }]
      }
    };
    var gradientChartOptionsConfigurationWithTooltipGreen: any = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.0)',
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 50,
            suggestedMax: 125,
            padding: 20,
            fontColor: "#9e9e9e"
          }
        }],

        xAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(0,242,195,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#9e9e9e"
          }
        }]
      }
    };
    this.getRoutesCountByMonth(gradientChartOptionsConfigurationWithTooltipRed);
    this.updateEgressChart(gradientChartOptionsConfigurationWithTooltipRed);
    this.createRedChart(gradientChartOptionsConfigurationWithTooltipGreen);


  }


  getRoutesCountByMonth(gradientChartOptionsConfigurationWithTooltipRed) {
    // Verificar el rol del usuario
    if (this.rol_user === 1) {
      // Si el rol es 1, usar el servicio para rutas por usuario
      const user_id = parseInt(localStorage.getItem('usuario_id'));
      this.dashboardService.getCountRoutesByUser(user_id).subscribe((data: any) => {
        const counts = Object.values(data);
        
        this.datasets = [counts];
        this.data = this.datasets[0];
        
        this.createChart(gradientChartOptionsConfigurationWithTooltipRed);
      }, error => {
        console.error('Error al cargar los conteos de rutas por usuario:', error);
      });
    } else {
      // Si no, usar el servicio normal
      this.dashboardService.getCountRoutesByMonth().subscribe((data: any) => {
        const counts = Object.values(data);
        
        this.datasets = [counts];
        this.data = this.datasets[0];
        
        this.createChart(gradientChartOptionsConfigurationWithTooltipRed);
      }, error => {
        console.error('Error al cargar los conteos de rutas por mes:', error);
      });
    }
  }
  
  
  
  createChart(gradientChartOptionsConfigurationWithTooltipRed) {
    const chart_labels = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'];
    this.canvas = document.getElementById("chartBig1");
    this.ctx = this.canvas.getContext("2d");
  
    var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);
    gradientStroke.addColorStop(1, 'rgba(128,0,128,0.2)'); // Color morado claro
    gradientStroke.addColorStop(0.4, 'rgba(128,0,128,0.0)');
    gradientStroke.addColorStop(0, 'rgba(128,0,128,0)'); // Morado
  
    var config = {
      type: 'line',
      data: {
        labels: chart_labels,
        datasets: [{
          label: "Viajes",
          fill: true,
          backgroundColor: gradientStroke,
          borderColor: '#800080', 
          borderWidth: 2,
          pointBackgroundColor: '#800080', 
          pointBorderColor: 'rgba(255,255,255,0)',
          pointHoverBackgroundColor: '#800080', 
          pointBorderWidth: 10,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: this.data,
        }]
      },
      options: {
        ...gradientChartOptionsConfigurationWithTooltipRed,
        scales: {
          y: {
            beginAtZero: true, // Comienza en 0
            min: 0, // Mínimo en 0
            max: 70, // Máximo en 90
            ticks: {
              stepSize: 10, 
            },
          },
        },
      }
    };
  
    this.myChartData = new Chart(this.ctx, config);
  }
  
  
  updateEgressChart(gradientChartOptionsConfigurationWithTooltipGreen) {
    const chart_labels = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'];
  
    // Verificar el rol del usuario
    const serviceCall = this.rol_user == 1
      ? this.dashboardService.getEgressByUser(parseInt(localStorage.getItem('usuario_id'))) // Llamar a getEgressByUser si rol es 1
      : this.dashboardService.getEgressByMonth(); // Llamar a getEgressByMonth si rol no es 1
  
    serviceCall.subscribe((data: any) => {
      const egressData = Object.values(data);
  
      // Verificar si el elemento del canvas existe antes de continuar
      const canvasElement = document.getElementById("chartLineGreen");
      if (!canvasElement) {
        console.error('No se encontró el elemento canvas con id "chartLineGreen".');
        return;
      }
  
      this.canvas = canvasElement;
      this.ctx = this.canvas.getContext("2d");
  
      // Crear gradiente
      const gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);
      gradientStroke.addColorStop(1, 'rgba(233,32,16,0.15)');
      gradientStroke.addColorStop(0.4, 'rgba(233,32,16,0.0)');
      gradientStroke.addColorStop(0, 'rgba(233,32,16,0)');
  
      // Datos para el gráfico
      const chartData = {
        labels: chart_labels,
        datasets: [{
          label: "Egresos",
          fill: true,
          backgroundColor: gradientStroke,
          borderColor: '#e92010', // Color rojo
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: '#e92010',
          pointBorderColor: 'rgba(255,255,255,0)',
          pointHoverBackgroundColor: '#e92010',
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: egressData,
        }]
      };
  
      // Crear gráfico
      new Chart(this.ctx, {
        type: 'line',
        data: chartData,
        options: {
          ...gradientChartOptionsConfigurationWithTooltipGreen,
          scales: {
            yAxes: [{
              ticks: {
                callback: function(value) {
                  return '$' + value.toLocaleString('es-CO'); // Formato para pesos colombianos
                }
              }
            }]
          },
          tooltips: {
            callbacks: {
              label: function(tooltipItem, data) {
                const value = tooltipItem.yLabel;
                return 'Egresos: $' + value.toLocaleString('es-CO'); // Formato para pesos colombianos en tooltip
              }
            }
          }
        }
      });
    }, error => {
      console.error('Error al cargar los egresos por mes:', error);
    });
  }
  
  
  
  
  
  

  createRedChart(gradientChartOptionsConfigurationWithTooltipGreen) {
    const chart_labels = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'];
  
    // Determina qué servicio usar según el rol de usuario
    const profitsObservable = this.rol_user == 1 
      ? this.dashboardService.getProfitsByUser(parseInt(localStorage.getItem('usuario_id'))) // Asegúrate de que el usuario_id se convierte a número
      : this.dashboardService.getProfitsByMonth();
  
    profitsObservable.subscribe((data: any) => {
      const egressData = Object.values(data); // Los totales por mes
  
      // Configuración del lienzo y el contexto del gráfico
      this.canvas = document.getElementById("chartLineRed");
      this.ctx = this.canvas.getContext("2d");
  
      var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);
      gradientStroke.addColorStop(1, 'rgba(66,134,121,0.15)');
      gradientStroke.addColorStop(0.4, 'rgba(66,134,121,0.0)');
      gradientStroke.addColorStop(0, 'rgba(66,134,121,0)');
  
      // Datos y configuración del gráfico
      var chartData = {
        labels: chart_labels,  
        datasets: [{
          label: "Ingresos",
          fill: true,
          backgroundColor: gradientStroke,
          borderColor: '#00d6b4',
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: '#00d6b4',
          pointBorderColor: 'rgba(255,255,255,0)',
          pointHoverBackgroundColor: '#00d6b4',
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: egressData, 
        }]
      };
  
      // Crear el gráfico con los datos y opciones de configuración
      var myChart = new Chart(this.ctx, {
        type: 'line',
        data: chartData,
        options: {
          ...gradientChartOptionsConfigurationWithTooltipGreen,
          scales: {
            yAxes: [{
              ticks: {
                callback: function(value) {
                  return '$' + value.toLocaleString('es-CO'); 
                }
              }
            }]
          },
          tooltips: {
            callbacks: {
              label: function(tooltipItem, data) {
                const value = tooltipItem.yLabel;
                return 'Ingresos: $' + value.toLocaleString('es-CO'); 
              }
            }
          }
        }
      });
    }, error => {
      console.error('Error al cargar los egresos por mes:', error);
    });
  }
  
  
  
}
