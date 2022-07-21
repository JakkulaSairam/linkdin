import { Component, OnInit ,Input } from '@angular/core';
import {Address} from "../../models/address.model";
import {AddresstypeModel} from "../../models/addresstype.model";
import {map} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Router, RouterModule} from "@angular/router";
import {GetAddressTypeListService} from "../../Services/getAddressTypeList.service";

@Component({
  selector: 'app-address-componenet',
  templateUrl: './address-componenet.component.html',
  styleUrls: ['./address-componenet.component.css']
})
export class AddressComponenetComponent implements OnInit {
  @Input('id') id = 0;

  address: Address[];
  addresss: AddresstypeModel[] = [];

  constructor(private http: HttpClient, private router: Router,private getAddresslist:GetAddressTypeListService) {
  }

  ngOnInit(): void {
    this.getAddressTypeList();
    this.getAddressList();

  }

  getAddressTypeList(){
    this.getAddresslist.getAddressTypes().subscribe(addty=>{
      this.assignAddresstype(addty);
    });
  }
  assignAddresstype(addty: AddresstypeModel[]) {
    this.addresss = addty;
  }

  addAddress(operationToPerform: string) {
      this.router.navigate(['/profile/' + this.id + '/address/'+ operationToPerform]);



  }
  editAddress(id:number){
    this.router.navigate(['/profile/' + this.id + '/address/edit/' +id ]);
  }


  assignAddress(address:Address[]){
    this.address=address;
  }

  getAddressTypeNameFromId(addressTypeId: number) {
    let addres="";
    for(let addr of this.addresss){
      if(addressTypeId==addr.id){
        addres=addr.type;
      }
    }
    return addres;
  }

  DeleteUserByAddressId(id: number) {
    this.http.delete('http://localhost:8080/user/address/'+id).subscribe(response=>{
      this.getAddressList();
    })

  }

  getAddressList(){
    this.http.get('http://localhost:8080/user/address/'+this.id).pipe(map((response:any)=>
    {
      const address:Address[]=[];
      for(const key in response.data.Address){
      address.push({...response.data.Address[key]});}
      return address
    })).subscribe((address:Address[])=>{
      this.assignAddress(address);
    });
  }

}
