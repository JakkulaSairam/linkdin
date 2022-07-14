import { Component, OnInit } from '@angular/core';
import {User} from "../models/user.model";
import {UsersService} from "../users.service";
import {NgModel} from "@angular/forms";
import {LoginUser} from "../models/loginuser.model";

@Component({
  selector: 'app-login-com',
  templateUrl: './login-com.component.html',
  styleUrls: ['./login-com.component.css']
})
export class LoginComComponent implements OnInit {

  constructor(private loginserveice:UsersService) { }

  ngOnInit(): void {
  }
  onSubmit(user:LoginUser){
    this.loginserveice.checkLoginUser(user.email,user.password);


  }

}
