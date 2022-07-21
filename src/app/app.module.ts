import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComComponent } from './login-com/login-com.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import {RouterModule, Routes} from "@angular/router";
import { ProfileComponent } from './profile/profile.component';
import { AddressComponenetComponent } from './profile/address-componenet/address-componenet.component';
import { EducationComponentComponent } from './profile/education-component/education-component.component';
import { ExperienceComponentComponent } from './profile/experience-component/experience-component.component';
import { SkillsComponentComponent } from './profile/skills-component/skills-component.component';
import { AddressFormComponent } from './profile/address-componenet/address-form/address-form.component';
import { EducationFormComponent } from './profile/education-component/education-form/education-form.component';
import { NavBarComponentComponent } from './nav-bar-component/nav-bar-component.component';
import { ExperienceFormComponent } from './profile/experience-component/experience-form/experience-form.component';
const appRoutes:Routes=[
  {path:"",component:LoginComComponent},
  {path:'register',component:RegisterComponent},
  {path:'profile/:id',component:ProfileComponent},
  {path:'profile/:id/address/:operationToPerform',component:AddressFormComponent},
  {path:'profile/:id/education/:operationToPerform',component:EducationFormComponent},
  {path:'profile/:id/address/:operationToPerform/:addressId',component:AddressFormComponent},
  {path:'profile/:id/education/:operationToPerform/:educationId',component:EducationFormComponent},
  {path:'profile/:id/experience/:operationToPerform/:experienceId',component:ExperienceFormComponent},
  {path:'profile/:id/experience/:operationToPerform',component:ExperienceFormComponent},
]
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComComponent,
    ProfileComponent,
    AddressComponenetComponent,
    EducationComponentComponent,
    ExperienceComponentComponent,
    SkillsComponentComponent,
    AddressFormComponent,
    EducationFormComponent,
    NavBarComponentComponent,
    ExperienceFormComponent,

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
