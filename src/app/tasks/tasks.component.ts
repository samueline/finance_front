import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../services/login/login.service';
import { TareasService } from '../services/tasks/tareas.service';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  constructor(
    private tareasService:TareasService,
    private formBuilder:FormBuilder,
    private _snackBar: MatSnackBar,
    private loginService : LoginService
  ) { }
  public id:any
  public data:any = []
  displayedColumns: string[] = [ 'Nombre', 'Descripcion','fecha','editar','eliminar'];
  public listado:any=[]
  ngOnInit(): void {
    this.listar()
    this.id = localStorage.getItem('user_id')
    this.data = this.formBuilder.group({
      titulo:[''],
      descripcion:[''],
      fecha_ejecucion:[''],
      id:[]

    })
   

  }


 
 

listar(){
  this.tareasService.get_tareas().subscribe(
    e=>{
      this.listado = e
      console.log(this.listado)
    this.alert()

    }
  )
}

crear(){
  var date = new Date(this.data.value.fecha_ejecucion);
  let hoy=  date.toISOString().substring(0, 10);
  let data = {
    "titulo":this.data.value.titulo,
    "descripcion":this.data.value.descripcion,
    "fecha_ejecucion":hoy,
    
    "user": this.id
  }
  console.log(data)
  this.tareasService.crear_tareas(data).subscribe(
    (    response: any)=>{
      console.log(response)
      this.listar()
    }
  )
}
  eliminar(id:any){
    console.log("beeeeeeeeeeeee",id)
    this.tareasService.eliminar_tareas(id).subscribe(e=>{
      console.log("hecho")
      this.listar()
    })
  }

  alert(){
    const time = Date.now();
    let fecha: string
    let hoy: string
    fecha = this.listado.fecha_ejecucion
    var date = new Date(time);
    hoy=  date.toISOString().substring(0, 10);
    // this.openSnackBar("test","cerrar")
    this.listado.map(
      (res:any)=>{
        console.log(hoy," dasdaaaaaaa",res.fecha_ejecucion)
        if(hoy == res.fecha_ejecucion){
          this.openSnackBar("la tarea "+res.titulo+" se va a vencer","Cerrar")
        }
      }
    )
    
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
