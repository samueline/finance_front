import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GastoService {



  private url:string = environment.serverUrl 
  

  constructor(private http : HttpClient) { }
  // httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
 

  
  get_gasto(){
    const headers = new HttpHeaders({'Content-Type': 'application/json'})
    return this.http.get(this.url+'gastos/', { headers: headers })
  
  }
  

  crear_gasto(data:any):any{
    const headers: any = {
      'Content-Type':'application/json'
   };
   //Post options pass it to HttpHeaders Class 
   const httpOptions = {
       headers: new HttpHeaders(headers),
   };
    let params =JSON.stringify(data)
    return this.http.post(this.url+'gastos/crear',params,httpOptions)
  }

  actualizar_gasto(data:any,id:any):any{
    const headers: any = {
      'Content-Type':'application/json'
   };
   //Post options pass it to HttpHeaders Class 
   const httpOptions = {
       headers: new HttpHeaders(headers),
   };
    let params =JSON.stringify(data)
    return this.http.put(this.url+'gastos/update/'+id,params,httpOptions)
  }

}
