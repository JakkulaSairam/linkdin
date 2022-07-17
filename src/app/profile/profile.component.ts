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

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  id: string="";
  username:string="";
  public user:User;

  //profile address
  showadd=false;
  address:Address;


  //profile education
  showedu=false;
  education:Education[];

  //profile experience
  showexp=false;
  experience:Experience[];

  //profile skills
  skills1={1:'C',2:'C++',3:'Java',4:'Python',5:'DBMS',6:'Web Development'};
  showskill=false;
  proficiency1={1:'Beginner',2:'Intermediate',3:'Advanced',4:'Expert'};
  skills:Skills[];



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


    this.http.get('http://localhost:8080/user/address/'+this.id).pipe(map((response:any)=>
    {
      let address:Address;
      address=({...response.data.Address});
      return address
    })).subscribe((address:Address)=>{
        this.assignAddress(address);
      });

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

    this.http.get('http://localhost:8080/user/skill/'+this.id).pipe(map((response:any)=>{
      const skillarray:Skills[]=[];
      console.log(response);
      for(const key in response.data.Skill){
        skillarray.push({...response.data.Skill[key]});
      }
      return skillarray;
    })).subscribe(skillarray=>{
      this.assignSkills(skillarray);
      }
  );




    }



assign(user:User){
    this.user=user;
    this.username=user.first_name+user.last_name;
}


showAddress(){
    this.showadd=!this.showadd;
}
  addAddressToServer(address:Address){
    address.userId=Number(this.id);
    this.http.post('http://localhost:8080/user/address/',address).subscribe(response=>{
      console.log(response);
    });
    console.log(address);
    alert("Address Added");
    this.showAddress();
    this.ngOnInit();
    window.location.reload();
}
assignAddress(address:Address){
    this.address=address;
}





showEducation(){
    this.showedu=!this.showedu;
}
addEducationToServer(education:Education){
  education.userId=Number(this.id);
  this.http.post('http://localhost:8080/user/education/',education).subscribe(response=>{
    // console.log(response);
    alert("Education Added");

  });



    this.showEducation();
  this.ngOnInit();
  window.location.reload();
}
  assignEducation(eduArray:Education[]){
    this.education=eduArray;
}




showExperience(){
    this.showexp=!this.showexp;
}
addExperienceToServer(experience:Experience){
    experience.userId=Number(this.id);
    experience.employmentTypeId=1;
    this.http.post('http://localhost:8080/user/experience/',experience).subscribe(response=>{
      alert("Experience Added");
    })

    this.showExperience();
  this.ngOnInit();
  window.location.reload();
}
showSkill(){
    this.showskill=!this.showskill;
}
assignExperience(expArray:Experience[]){
  this.experience=expArray;
  }


  addSkillsToServer(skillsFormData:Skills){

    skillsFormData.userId=Number(this.id);
    this.http.post('http://localhost:8080/user/skill/',skillsFormData).subscribe(response=>{

    });
    this.showSkill();
    this.ngOnInit();
    window.location.reload();
  }
  assignSkills(skills:Skills[]){
    this.skills=skills;
    console.log(skills);
  }

}

