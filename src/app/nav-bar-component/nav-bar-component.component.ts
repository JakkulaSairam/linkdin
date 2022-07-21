import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar-component',
  templateUrl: './nav-bar-component.component.html',
  styleUrls: ['./nav-bar-component.component.css']
})
export class NavBarComponentComponent implements OnInit {
  loggedStatus=false;
  constructor() { }

  ngOnInit(): void {
    if(localStorage.getItem('userId')){
      this.loggedStatus=true
    }
  }

  changeStatusToLogout() {
    localStorage.removeItem('userId');
  }
}
