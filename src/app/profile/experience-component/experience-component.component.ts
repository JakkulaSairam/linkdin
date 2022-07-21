import {Component, Input, OnInit} from '@angular/core';
import {Experience} from "../../models/experience.model";
import {map} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-experience-component',
  templateUrl: './experience-component.component.html',
  styleUrls: ['./experience-component.component.css']
})
export class ExperienceComponentComponent implements OnInit {
  @Input('id') id;
  experience:Experience[];
  constructor(private http:HttpClient,private router:Router) { }
  ngOnInit(): void {
    this.getExperienceList();
  }
  getExperienceList(){
    this.http.get('http://localhost:8080/user/experience/'+this.id).pipe(map((response:any)=>{
      const exparray:Experience[]=[];
      for(const key in response.data.experience){
        exparray.push({...response.data.experience[key]})
      }
      return exparray;
    })).
    subscribe(exparray=>{
      this.assignExperience(exparray);

    });
  }
  addExperinceToServer(operationToPerform:string){
    this.router.navigate(['/profile/' + this.id + '/experience/'+ operationToPerform]);

  }
  editExperience(id:number){
    this.router.navigate(['/profile/' + this.id + '/experience/edit/' +id ]);
  }


  assignExperience(expArray:Experience[]){
    this.experience=expArray;
  }


  deleteExperienceById(id: number) {
this.http.delete('http://localhost:8080/user/experience/'+id).subscribe();
alert("Succesfully Delete");
this.getExperienceList();

  }
}
