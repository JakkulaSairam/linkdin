import { Component, OnInit } from '@angular/core';
import {Education} from "../../../models/education.model";
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-education-form',
  templateUrl: './education-form.component.html',
  styleUrls: ['./education-form.component.css']
})
export class EducationFormComponent implements OnInit {
  id:string;
  operationToPerform:string;
  education:Education;
  educationForm:FormGroup;
  educationId:string;
  constructor(private route:ActivatedRoute, private http:HttpClient,private router:Router) { }

  ngOnInit(): void {
    this.educationForm=new FormGroup({
      'school':new FormControl(null),
      'degree':new FormControl(null),
      'fieldOfStudy':new FormControl(null),
      'startDate':new FormControl(null),
      'endDate':new FormControl(null),
      'grade':new FormControl(null)
    })
    this.id=this.route.snapshot.params['id'];
    this.operationToPerform=this.route.snapshot.params['operationToPerform'];
    if(this.operationToPerform=='edit'){
      this.educationId=this.route.snapshot.params['educationId'];
    }
    this.route.params.subscribe((params:Params)=>{
      this.id=params['id'];
      this.operationToPerform=params['operationToPerform'];
      this.educationId=params['educationId']
    });
    this.assignForm();
  }
assignForm(){

    if(this.operationToPerform==='edit'){
      this.http.get('http://localhost:8080/user/education/single/'+this.educationId).pipe(map((response:any)=>{
        return ({...response.data.education});
      })).subscribe((education:Education)=>{
        this.assignEducation(education);
      });
    }
}
assignEducation(education:Education){
    this.education=education;
    this.educationForm.patchValue(this.education);
}
addEducationToServer(){
    if(this.operationToPerform==='add'){
      this.education=this.educationForm.value;
      this.education.userId=Number(this.id);
      this.http.post('http://localhost:8080/user/education/',this.education).subscribe(response=>{
        alert("Education Added");
      });
      this.router.navigate(['/profile',this.id]);
    }
    else{
      this.education=this.educationForm.value;
      this.education.userId=Number(this.id);
      this.education.id=Number(this.educationId)
      this.http.put('http://localhost:8080/user/education/',this.education).subscribe(response=>{
        alert("Education Updated");
      });
      this.router.navigate(['/profile',this.id]);
    }
}
}
