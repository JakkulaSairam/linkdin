import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";
import {User} from "../models/user.model";
import {Address} from "../models/address.model";
import {Education} from "../models/education.model";
import {Experience} from "../models/experience.model";
import {Skills} from "../models/Skills.model";
import {NgForm} from "@angular/forms";
import {SkillsData} from "../models/skillsdata.model";
import {AddresstypeModel} from "../models/addresstype.model";
import {Proficiency} from "../models/proficiency.model";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  id: number;
  username:string="";
  public user:User;
  constructor(private route:ActivatedRoute,private http:HttpClient) { }
  ngOnInit() {
    this.id=this.route.snapshot.params['id'];
    this.http.get('http://localhost:8080/user/'+this.id).pipe(map((response:any)=>{
      // let user: User = new User(response.data.user.first_name, response.data.user.last_name, response.data.user.email, response.data.user.phone, response.data.user.password, response.data.user.gender);

            let user:User;
            user=({...response.data.user})

          return user;
    })
    ).subscribe((user:User)=>{
      this.assign(user);
    });
     }


  assign(user:User){
    this.user=user;
    this.username=user.first_name+user.last_name;
  }



}

