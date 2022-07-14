import { Component, OnInit } from '@angular/core';
import {User} from "../models/user.model";
import {UsersService} from "../users.service";
import {NgModel} from "@angular/forms";
import {LoginUser} from "../models/loginuser.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-com',
  templateUrl: './login-com.component.html',
  styleUrls: ['./login-com.component.css']
})
export class LoginComComponent implements OnInit {
  constructor(private loginService:UsersService , private router:Router) { }
  // loggedIn=false;
  invalidCred=false;
  ngOnInit(): void {
  }
   onSubmit(user: LoginUser) {
     this.loginService.checkLoginUser(user.email, user.password).subscribe((response: any) => {
       if(response.body.data.email.toString()=='not'){
         this.setLogStatus(true,response.body.data.email.toString());

       }else{
         this.setLogStatus(false,response.body.data.email.toString());

       }

     });
   }
   setLogStatus(flag:boolean,text:string){
    // this.loggedIn=!flag;
     if(flag==false){

       console.log(text)
     this.router.navigate(['/profile',text])
     }
    this.invalidCred=flag;
   }

}
