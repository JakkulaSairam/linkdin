import { Injectable} from "@angular/core";
import {User} from "./models/user.model";
import {HttpClient} from "@angular/common/http";
import {LoginUser} from "./models/loginuser.model";
import {map} from "rxjs";

@Injectable({ providedIn: 'root'})
export class UsersService{

  constructor(private http:HttpClient) {
  }
  registerUser( users:User){
    this.http.post('http://localhost:8080/user/signup',users).subscribe(responseData=> {
      console.log(responseData);
    });
  }
  checkLoginUser(email:string,password:string){
    const user:LoginUser={email,password};
    return this.http.post('http://localhost:8080/user/login',user,{observe:'response'})
  }
}
