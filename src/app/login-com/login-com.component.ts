import { Component, OnInit } from '@angular/core';
import {User} from "../models/user.model";
import {UsersService} from "../Services/users.service";
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
  loggedIn=false;
  invalidCred=false;
  ngOnInit(): void {
  }
   onSubmit(user: LoginUser) {
     this.loginService.checkLoginUser(user.email, user.password).subscribe((response: any) => {
       if(response.body.data.id.toString()==="-1"){
         this.setLogStatus(true,response.body.data.id);

       }else{
         this.setLogStatus(false,response.body.data.id);

       }

     });
   }
   setLogStatus(flag:boolean,id:number){
    // this.loggedIn=!flag;
     if(flag==false){
       this.loggedIn=true;
       localStorage.setItem('userId', id.toString());
     this.router.navigate(['/profile',id]);

     }
    this.invalidCred=flag;
   }

}
