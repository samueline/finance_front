import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
    private loginService:LoginService
  ) { 

  }
 public data:any
 public dataSignup:any
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


