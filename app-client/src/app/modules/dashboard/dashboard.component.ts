import { Component, OnInit } from '@angular/core';
import { LoggerService } from '../../core/logger.service';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public loggedUser: User;

  constructor(
    private loggerService: LoggerService
  ) { };

  ngOnInit(): void {
    this.loggedUser = JSON.parse(localStorage.getItem('user'));
  };

  logout() {
    this.loggerService.logout();
  };

  /* ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    console.log('El user antes de unsuscribe es ', this.loggerService.userValue);
    this.loggerService.userSubjectValue.next(null);
    this.loggerService.userSubjectValue.complete();
    console.log('El user después de unsuscribe es ', this.loggerService.userValue);
  } */

}
