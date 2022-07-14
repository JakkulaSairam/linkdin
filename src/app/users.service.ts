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
    this.http.post('https://fir-backend-2538b-default-rtdb.firebaseio.com/user.json',users).subscribe(responseData=> {
      console.log(responseData);
    });
  }
  checkLoginUser(email:string,password:string){
    const user:LoginUser={email,password};
    return this.http.post('',user,{observe:'response'});
  }
}
