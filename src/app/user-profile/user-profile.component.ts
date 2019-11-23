import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor() { }

   openNav() {
    document.getElementById("mySidenav").style.width = "365px";
   }

   closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }

  ngOnInit() {
  }

}
