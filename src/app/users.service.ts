import { Injectable} from "@angular/core";
import {User} from "./models/user.model";
import {HttpClient} from "@angular/common/http";

@Injectable({ providedIn: 'root'})
export class UsersService{

  constructor(private http:HttpClient) {
  }
  registerUser( users:User){
    this.http.post('https://fir-backend-2538b-default-rtdb.firebaseio.com/user.json',users).subscribe(responseData=> {
      console.log(responseData);
    });
  }
}
