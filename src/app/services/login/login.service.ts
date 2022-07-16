import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
  private http:HttpClient
  ) { }


    private url:string = environment.serverUrl 
    
  
   
    // httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    public static HEADERS(contentype:any):any{
      let jsonn
      jsonn={
        'Content-Type':contentype
      }
    }
  
    
    get_user(){
      const headers = new HttpHeaders()
      return this.http.get(this.url+'login/listar', { headers:LoginService.HEADERS('application/json') })
    
    }
  
    login(data:any):any{
      const headers: any = {
        'Content-Type':'application/json'
     };
     //Post options pass it to HttpHeaders Class 
     const httpOptions = {
         headers: new HttpHeaders(headers),
     };
      let params =JSON.stringify(data)
      return this.http.post(this.url+'login/',params,httpOptions)
    }

     crear_user(data:any):any{
      const headers: any = {
        'Content-Type':'application/json'
     };
     //Post options pass it to HttpHeaders Class 
     const httpOptions = {
         headers: new HttpHeaders(headers),
     };
      let params =JSON.stringify(data)
      return this.http.post(this.url+'signup/',params,httpOptions)
    }
}
