import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  constructor(private http : HttpClient) { }

 
  
    private url:string = environment.serverUrl 
    
  
   
    // httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    public static HEADERS(contentype:any):any{
      let jsonn
      jsonn={
        'Content-Type':contentype
      }
    }
  
    
    get_tareas(){
      const headers = new HttpHeaders()
      return this.http.get(this.url+'tareas/listar', { headers: TareasService.HEADERS('application/json') })
    
    }
  
    crear_tareas(data:any):any{
      const headers: any = {
        'Content-Type':'application/json'
     };
     //Post options pass it to HttpHeaders Class 
     const httpOptions = {
         headers: new HttpHeaders(headers),
     };
      let params =JSON.stringify(data)
      return this.http.post(this.url+'tareas/',params,httpOptions)
    }
    actualizar_tareas(data:any,id:any):any{
      const headers: any = {
        'Content-Type':'application/json'
     };
     //Post options pass it to HttpHeaders Class 
     const httpOptions = {
         headers: new HttpHeaders(headers),
     };
      let params =JSON.stringify(data)
      return this.http.put(this.url+'tareas/update/'+id,params,httpOptions)
    }
    eliminar_tareas(id:any){
      const headers = new HttpHeaders()
      return this.http.delete(this.url+'tareas/eliminar/'+id, { headers: TareasService.HEADERS('application/json') })
    
    }
  }





