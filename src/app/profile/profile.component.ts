import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  username: string="";
  constructor(private route:ActivatedRoute,private http:HttpClient) { }
  ngOnInit() {
    this.username=this.route.snapshot.params['email'];
    console.log(this.username);
    this.http.get('http://localhost/user/'+this.username).subscribe(response=>{
      console.log(response);
    })
  }

}
