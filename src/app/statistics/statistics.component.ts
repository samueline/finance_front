import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
// import { ChartOptions } from 'chart.js';
import { GastoService } from '../services/gastos/gasto.service';
import { IngresosService } from '../services/ingresos.service';


@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  private _http: any;
  str1: string | undefined;
  resavg: any;

 

  constructor(
    private ingresoService:IngresosService,
    private gastosService:GastoService,
    private http : HttpClient
  ) { 
    // monkeyPatchChartJsTooltip();
    // monkeyPatchChartJsLegend();
  }

  public ingreso:any
  public gastos:any
  ngOnInit(): void {
    this.listar_ingreso()
    this.listarGasto()
   this.listarPorcentaje()
  }
  

  listar_ingreso(){
    this.ingresoService.get_ingresos().subscribe(
      response => {
        this.ingreso = response
        console.log(this.ingreso)
      
      }
    )

    console.log("adsd",this.ingreso)
  }

  listarGasto(){
    this.gastosService.get_gasto().subscribe(
      response => {
        this.gastos = response
        this.totalCost()
      }
    )
  }

  getTotalCost() {
    return this.gastos.map((t:any) => parseInt(t.valor)).reduce((acc: any, value: any) => 
      acc + value,0 );
  }

  getTotalIng() {
    return this.ingreso.map((t:any) => parseInt(t.valor)).reduce((acc: any, value: any) => 
      acc + value,0 );
  }

    public total:any
    totalCost(){
      let a
      let b
      a = this.getTotalIng()
      b = this.getTotalCost()
      
      this.total = parseInt(a) - parseInt(b)

    }
   
    public resp:any

    listarPorcentaje(){
      this.ingresoService.porcentajes().subscribe(
        response => {
          this.resp = response
          
        }
      )
    }
}
