import {Component, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user.model";
import {UsersService} from "../users.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  genders =['male','female','others'];
  phoneNo:number=0;
  phoneNumHelpBlock=false;
  confirmPassword:string="";
  confirmPasswordHelpBlock=false;
  constructor(private http:HttpClient,private registerService:UsersService) {

  }

  ngOnInit(): void {
  }

  onSubmit(users:User,f:NgForm){
    this.phoneNo=users["phone"];
    this.confirmPassword=(<HTMLInputElement>document.getElementById("confirmPassword")).value;
    if(this.phoneNo.toString().length<10 || this.phoneNo.toString().length>10){
      this.phoneNumHelpBlock=true;
    }
    else if ( this.confirmPassword!==users["password"]){
    this.confirmPasswordHelpBlock=true;
      console.log(this.confirmPassword===users["password"]);
      console.log(this.confirmPassword + " " +users["password"])

    }
    else {
      this.phoneNumHelpBlock=false;
      this.confirmPasswordHelpBlock=false;
      this.registerService.registerUser(users);
    console.log(users);
    f.reset();
    this.confirmPassword="";


    }

  }

}
