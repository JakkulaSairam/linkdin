import {Component, Input, OnInit} from '@angular/core';
import {Education} from "../../models/education.model";
import {map} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-education-component',
  templateUrl: './education-component.component.html',
  styleUrls: ['./education-component.component.css']
})
export class EducationComponentComponent implements OnInit {
  @Input('id') id;
  showedu=false;
  education:Education[];
  constructor(private http:HttpClient,private router:Router) { }

  ngOnInit(): void {
    this.getEducationList();

  }

  addEducationToServer(operationToPerform){
    this.router.navigate(['/profile/' + this.id + '/education/'+ operationToPerform]);
  }
  editEducation(id:number){
    this.router.navigate(['/profile/' + this.id + '/education/edit/' +id ]);
  }
  assignEducation(eduArray:Education[]){
    this.education=eduArray;
  }

  getEducationList(){
    this.http.get('http://localhost:8080/user/education/'+this.id).pipe(map((response:any)=>{
      const eduarray:Education[]=[];
      for(const key in response.data.education){
        eduarray.push({...response.data.education[key]})
      }
      return eduarray;
    })).
    subscribe(eduArray=>{
      this.assignEducation(eduArray);
    });
  }


   deleteEducationById(id: number) {
      this.http.delete('http://localhost:8080/user/education/'+id).subscribe(res=> {
        this.getEducationList();
      });
  }
}
