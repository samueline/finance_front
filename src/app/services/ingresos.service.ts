import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IngresosService {
  private url:string = environment.serverUrl 
  

  constructor(private http : HttpClient) { }
  // httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  public static HEADERS(contentype:any):any{
    let jsonn
    jsonn={
      'Content-Type':contentype
    }
  }

  
  get_ingresos(){
    const headers = new HttpHeaders()
    return this.http.get(this.url+'ingreso/', { headers: IngresosService.HEADERS('application/json') })
  
  }
  get_avg(code:any){
    const headers = new HttpHeaders()
    return this.http.get(this.url+"ingreso/getavg/" + code, { headers: IngresosService.HEADERS('application/json') })
  }
  porcentajes(){
    const headers = new HttpHeaders()
    return this.http.get(this.url+'total/', { headers: IngresosService.HEADERS('application/json') })
  
  }

  crear_ingreso(data:any):any{
    const headers: any = {
      'Content-Type':'application/json'
   };
   //Post options pass it to HttpHeaders Class 
   const httpOptions = {
       headers: new HttpHeaders(headers),
   };
    let params =JSON.stringify(data)
    return this.http.post(this.url+'ingreso/crear',params,httpOptions)
  }
  actualizar_ingreso(data:any,id:any):any{
    const headers: any = {
      'Content-Type':'application/json'
   };
   //Post options pass it to HttpHeaders Class 
   const httpOptions = {
       headers: new HttpHeaders(headers),
   };
    let params =JSON.stringify(data)
    return this.http.put(this.url+'ingreso/upt/'+id,params,httpOptions)
  }
}