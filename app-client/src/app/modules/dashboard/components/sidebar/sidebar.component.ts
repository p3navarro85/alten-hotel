import { Component, OnInit } from '@angular/core';
import { User } from '../../../../shared/models/user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public loggedUser: User;

  constructor() { }

  ngOnInit(): void {
    this.loggedUser = JSON.parse(localStorage.getItem('user'));
    if(document.getElementById("sb-admin"))
    document.getElementById("sb-admin").remove();
    var Datatables = document.createElement("script");
    Datatables.setAttribute("id", "sb-admin");
    Datatables.setAttribute("src", "assets/js/sb-admin-2/sb-admin-2.min.js");
    document.body.appendChild(Datatables);
  }

  openQuoteWizard(){ 
  }

}
