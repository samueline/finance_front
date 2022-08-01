import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginService } from '../services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 

  constructor(
    private formBuilder : FormBuilder,
    private loginService:LoginService,
    private router:Router
  ) { 

  }
 public data:any
 public dataSignup:any
 public login_fail:boolean = false
 public id:any
  ngOnInit(): void {

    this.data = this.formBuilder.group({
      usuario:['',Validators.required],
      contrasena:['',Validators.required],
     

    })


    this.dataSignup = this.formBuilder.group({
      username:['',Validators.required],
      email:['',Validators.required],

      password:['',Validators.required],
      password_confirmation:['',Validators.required],
     

    })
  }

login(){

let data={
  "username":this.data.value.usuario,
  "password":this.data.value.contrasena

}


this.loginService.login(data).subscribe(
  (  e: any) => {
  console.log(e)
  if(e){
    
    this.login_fail = false
    console.log(data.username)
    this.loginService.get_user(data.username).subscribe(
      (i:any)=>{
      //id del usuario logueado
        this.id = i
        localStorage.setItem('user_id', this.id);
    
      }
    )
    this.router.navigate(['ingresos'])

  }else{
    this.login_fail = true 
  }
} 

)


}



signup(){

let data={
  "username":this.dataSignup.value.username,
  "password":this.dataSignup.value.password,
  "password_confirmation":this.dataSignup.value.password_confirmation,
  "email":this.dataSignup.value.email,
  "activo":1


}
this.loginService.crear_user(data).subscribe(
  (  e: any) => {
  console.log(e)
 

} 
)

}


}


