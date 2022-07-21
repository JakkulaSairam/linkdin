import { Component, OnInit } from '@angular/core';
import {Address} from "../../../models/address.model";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";
import {AddresstypeModel} from "../../../models/addresstype.model";
import {GetAddressTypeListService} from "../../../Services/getAddressTypeList.service";
import {FormControl, FormGroup, Validator, Validators} from "@angular/forms";

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css']
})
export class AddressFormComponent implements OnInit {
  id:string;
  operationToPerfrom:string;
  address:Address;
  addresss: AddresstypeModel[] = [];
  signUpForm:FormGroup;
  addressId:string;
  constructor(private route:ActivatedRoute,private http :HttpClient,private addressTypeService:GetAddressTypeListService,private router:Router) {

  }

  ngOnInit(): void {
    this.signUpForm=new FormGroup({
      'house_number':new FormControl(null),
      'city':new FormControl(null),
      'state':new FormControl(null),
      'country':new FormControl(null),
      'postalcode':new FormControl(null),
      'addressTypeId':new FormControl(null,[Validators.required])
    })


    this.getAddressTypeList();
    this.id=this.route.snapshot.params['id'];
    this.operationToPerfrom=this.route.snapshot.params['operationToPerform'];
    if(this.operationToPerfrom==='edit'){
      this.addressId=this.route.snapshot.params['addressId'];
    }
    this.route.params.subscribe(
      (params:Params)=>{
        this.id=params['id'];
        this.operationToPerfrom=params['operationToPerform'];
        this.addressId=params['addressId'];
      });
    this.assignForm();
  }
  assignForm(){
     if(this.operationToPerfrom==='edit'){
       this.http.get('http://localhost:8080/user/address/single/'+this.addressId).pipe(map((response:any)=>
       {
         return ({...response.data.Address})
       })).subscribe((address:Address)=>{
         this.assignAddress(address);
       });
       // this.signUpForm.patchValue();
     }
  }

  getAddressTypeList(){
    this.addressTypeService.getAddressTypes().subscribe(addty=>{
      this.assignAddresstype(addty);
    });
  }


  assignAddress(address:Address){
    this.address=address;
    this.signUpForm.patchValue(this.address)
  }
  assignAddresstype(addty: AddresstypeModel[]) {
    this.addresss = addty;
  }
  addAddressToServer(){
    if(this.operationToPerfrom==='add'){
      this.address=this.signUpForm.value;
      this.address.addressTypeId=Number(this.address.addressTypeId);
      this.address.userId=Number(this.id);
      this.http.post('http://localhost:8080/user/address/',this.address).subscribe(response=>{
        alert("Address Added");
      });
      this.router.navigate(['/profile',this.id]);
    }
    else{
      this.address=this.signUpForm.value;
      this.address.addressTypeId=Number(this.address.addressTypeId);
      this.address.userId=Number(this.id);
      this.address.id=Number(this.addressId);
      this.http.put('http://localhost:8080/user/address/',this.address).subscribe(response=>{
        alert("Address Updated");
      });
      this.router.navigate(['/profile',this.id]);
    }


  }

}
