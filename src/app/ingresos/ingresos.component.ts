import { DATE_PIPE_DEFAULT_TIMEZONE } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { IngresosService } from '../services/ingresos.service';


@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.component.html',
  styleUrls: ['./ingresos.component.css']
})
export class IngresosComponent implements OnInit {

  displayedColumns: string[] = [ 'Nombre', 'Descripcion', 'Efectivo','editar'];

  constructor(
    private ingresoService:IngresosService,
    private formBuilder:FormBuilder,
    
    ) { }

  public ingreso:any = []
  public data:any  

  ngOnInit(): void {
    this.listar_ingreso()

    this.data = this.formBuilder.group({
      name:['',Validators.required],
      descripcion:['',Validators.required],
      valor:['',Validators.required],
      activo:[''],
      id:[''],


    })


  }

 
  botonEdit(lista:any){
    
    this.data.controls['id'].setValue(lista.id)
    this.data.controls['descripcion'].setValue(lista.descripcion)
    this.data.controls['name'].setValue(lista.name)
    this.data.controls['valor'].setValue(lista.valor)


  }
  validar(){
    if(this.data.value.id){
      this.editar()
    }else{
      this.crear()
    }
  }

  limpiar(){
    this.data.controls['id'].reset()
    this.data.controls['descripcion'].reset()
    this.data.controls['name'].reset()
    this.data.controls['valor'].reset()

  }

  // export interface Transaction {
  //   item: string;
  //   cost: number;
  // }
  getTotalCost() {
    return this.ingreso.map((t:any) => parseInt(t.valor)).reduce((acc: any, value: any) => 
      acc + value,0 );
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

    crear(){
      let data =  {
        "name":this.data.value.name,
        "descripcion":this.data.value.descripcion,
        "valor":this.data.value.valor,
       
        "activo":1,
      };
      console.log("sadas",data)
      this.ingresoService.crear_ingreso(data).subscribe(
        (responses: any) => {
          console.log("beee",responses)
          this.listar_ingreso()
        }
      )
    }

    editar(){
      let id
      let data =  {
        'id':this.data.value.id,
        "name":this.data.value.name,
        "descripcion":this.data.value.descripcion,
        "valor":this.data.value.valor,
       
        "activo":1,
      };
      id = this.data.value.id
      console.log("sadas",data)
      this.ingresoService.actualizar_ingreso(data,id).subscribe(
        (responses: any) => {
          console.log("beee",responses)
          this.listar_ingreso()
        }
      )
    }


}
