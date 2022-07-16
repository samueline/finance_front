import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { GastoService } from '../services/gastos/gasto.service';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.css']
})
export class GastosComponent implements OnInit {

  constructor(
    private gastosService:GastoService,
    private formBuilder : FormBuilder
  ) { }
displayedColumns: string[] = [ 'Nombre', 'Descripcion', 'Efectivo','editar'];
  public gastosList:any = []
  public data:any
  ngOnInit(): void {
    this.listarGasto()
    this.data = this.formBuilder.group({
      name:['',Validators.required],
      descripcion:['',Validators.required],
      id:[''],
      valor:['',Validators.required],
    

    })


  }


  botonEdit(lista:any){
    console.log("dasd",lista)
    this.data.controls['id'].setValue(lista.id)
    this.data.controls['descripcion'].setValue(lista.descripcion)
    this.data.controls['name'].setValue(lista.name)
    this.data.controls['valor'].setValue(lista.valor)


  }
  validar(){
    console.log(this.data.value.id)
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


  getTotalCost() {
    return this.gastosList.map((t:any) => parseInt(t.valor)).reduce((acc: any, value: any) => 
      acc + value,0 );
  }
  listarGasto(){
    this.gastosService.get_gasto().subscribe(
      response => {
        this.gastosList = response
      }
    )
  }

  crear(){
    let data =  {
      "name":this.data.value.name,
      "descripcion":this.data.value.descripcion,
      "valor":this.data.value.valor,
      "activo":1,
    };
    console.log("sadas",data)
    this.gastosService.crear_gasto(data).subscribe(
      (responses: any) => {
        console.log("beee",responses)
        this.listarGasto()
      }
    )
  }

  editar(){
    let data =  {
      "id":this.data.value.id,
      "name":this.data.value.name,
      "descripcion":this.data.value.descripcion,
      "valor":this.data.value.valor,
      "activo":1,
    };
    let id = this.data.value.id
    this.gastosService.actualizar_gasto(data,id).subscribe(
      (responses: any) => {
        console.log("editar",responses)
        this.listarGasto()
      }
    )
  }

}
