import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";
import {AddresstypeModel} from "../models/addresstype.model";

@Injectable({ providedIn: 'root'})
export class GetAddressTypeListService{
  constructor(private http:HttpClient) {
  }
  getAddressTypes(){
    return this.http.get('http://localhost:8080/user/address/addressType/list').pipe(map((response:any)=>{
      const addTy:AddresstypeModel[]=[];
      for(const key in response.data.users){
        addTy.push({...response.data.users[key]});
      }
      return addTy;
    }));
  }
}
