import {Component, Input, OnInit} from '@angular/core';
import {Skills} from "../../models/Skills.model";
import {SkillsData} from "../../models/skillsdata.model";
import {Proficiency} from "../../models/proficiency.model";
import {map} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-skills-component',
  templateUrl: './skills-component.component.html',
  styleUrls: ['./skills-component.component.css']
})
export class SkillsComponentComponent implements OnInit {

  @Input('id') id;
  showskill=false;
  skills:Skills[];
  skillsDataFromBd:SkillsData[];
  proficiencyDataFromBd:Proficiency[];
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.getSkills();
  }
  getSkills(){
    this.http.get('http://localhost:8080/user/skill/'+this.id).pipe(map((response:any)=>{
      const skillarray:Skills[]=[];
      for(const key in response.data.Skill){
        skillarray.push({...response.data.Skill[key]});
      }
      return skillarray;
    })).subscribe(skillarray=>{
        this.assignSkills(skillarray);
      }
    );
    this.http.get('http://localhost:8080/user/skill/skills/list').pipe(map((response:any)=>{
      const skillarray:SkillsData[]=[];
      for(const key in response.data.skills){
        skillarray.push({...response.data.skills[key]})
      }
      return skillarray;


    })).subscribe(skillarray=>{
      this.assignSkillsData(skillarray);
    });

    this.http.get('http://localhost:8080/user/skill/proficiency/list').pipe(map((response:any)=>{
      const prof:Proficiency[]=[];
      for(const key in response.data.skills){
        prof.push({...response.data.skills[key]})
      }
      return prof;
    })).subscribe(prof=>{
      this.assignProficiency(prof);
    });
  }

  addSkillsToServer(skillsFormData:Skills){

    skillsFormData.userId=Number(this.id);
    this.http.post('http://localhost:8080/user/skill/',skillsFormData).subscribe(response=>{
    this.getSkills();

    });
    this.showSkill();
    this.ngOnInit();
  }

  assignSkills(skills:Skills[]){
    this.skills=skills;
  }
  showSkill(){
    this.showskill=!this.showskill;
  }
  assignSkillsData(skills:SkillsData[]){
    this.skillsDataFromBd=skills;
  }
  assignProficiency(prof:Proficiency[]){
    this.proficiencyDataFromBd=prof;
  }

  getSkillFromId(skillNameId: number) {
    let skillname="";
    for(let ski of this.skillsDataFromBd){
      if(skillNameId==ski.id){
        skillname=ski.name;
      }
    }
    return skillname;
  }

  getProficiencyFromId(proficiencyId: number) {
    let profi="";
    for(let pro of this.proficiencyDataFromBd){
      if(proficiencyId==pro.id){
        profi=pro.name;

      }
    }
    return profi;

  }
  deleteSkillById(id: number) {
    this.http.delete('http://localhost:8080/user/skill/'+id).subscribe(response=>{
      this.getSkills();
    }
    )
  }
}
