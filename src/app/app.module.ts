import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComComponent } from './login-com/login-com.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import {RouterModule, Routes} from "@angular/router";
import { ProfileComponent } from './profile/profile.component';
const appRoutes:Routes=[
  {path:"",component:LoginComComponent},
  {path:'register',component:RegisterComponent},
  {path:'profile',component:ProfileComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComComponent,
    ProfileComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
