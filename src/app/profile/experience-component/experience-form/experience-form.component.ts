import { Component, OnInit } from '@angular/core';
import {Experience} from "../../../models/experience.model";
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";

@Component({
  selector: 'app-experience-form',
  templateUrl: './experience-form.component.html',
  styleUrls: ['./experience-form.component.css']
})
export class ExperienceFormComponent implements OnInit {
  id:string=localStorage.getItem('userId');
  operationToPerform:string;
  experience:Experience;
  experienceForm:FormGroup;
  experienceId:string;
  constructor(private route:ActivatedRoute,private http:HttpClient,private router:Router) { }

  ngOnInit(): void {
    this.experienceForm=new FormGroup({
      'title':new FormControl(null),
      'companyName':new FormControl(null),
      'location':new FormControl(null),
      'startDate':new FormControl(null),
      'endDate':new FormControl(null)
    })
    this.operationToPerform=this.route.snapshot.params['operationToPerform'];
    if(this.operationToPerform=='edit'){
      this.experienceId=this.route.snapshot.params['educationId'];
    }
    this.route.params.subscribe((params:Params)=>{
      this.operationToPerform=params['operationToPerform'];
      this.experienceId=params['educationId'];
    });
    this.assignForm();
  }
assignForm(){
    if(this.operationToPerform==='edit'){
      this.http.get('http://localhost:8080/user/experience/single/'+this.experienceId).pipe(map((response:any)=>{
        return ({...response.data.experience});
      })).subscribe((experience:Experience)=>{
        this.assignExperience(experience);
      })
    }
}
assignExperience(experience:Experience){
    this.experience=experience;
    this.experienceForm.patchValue(experience);
}
addExperienceToServer(){
  if(this.operationToPerform==='add'){
    this.experience=this.experienceForm.value;
    this.experience.userId=Number(this.id);
    this.http.post('http://localhost:8080/user/experience/',this.experience).subscribe(response=>{
    });

  }
  else {
    this.experience = this.experienceForm.value;
    this.experience.userId = Number(this.id);
    this.experience.id = Number(this.experienceId)
    this.http.put('http://localhost:8080/user/experience/', this.experience).subscribe(response => {
      alert("Education Updated");
    });
  }
  setTimeout (() => {
    console.log("Hello from setTimeout");
  }, 2000);
    this.router.navigate(['/profile',this.id]);

}

}
