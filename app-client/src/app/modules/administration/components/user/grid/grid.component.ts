import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../../../shared/models/user.model';
import { UserService } from '../../../services/user.service';

declare var jQuery: any;

@Component({
  selector: 'app-administration-user-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridUserComponent implements OnInit {

  users$: Observable<{}[]>;
  selectedRow : Number;
  selectedUser: User;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.users$ = this.userService.users;
    this.userService.loadAll();
  }

  createUser(): void {
    this.selectedUser = new User();
    jQuery('#newUserModal').modal('show');
  };

  saveDetailsChanges(event){
    if(event.user.id)
    {
      this.userService.update(event.user);
    }
    else{
      this.userService.create(event.user);
    }
    jQuery('#newUserModal').modal('hide');
  }

  cancelDetailsChanges(event){
    this.selectedUser = null;
    this.selectedRow = -1;
    jQuery('#newUserModal').modal('hide');
  }

  setClickedRow(user, index):void{
    this.selectedRow = index;
    this.selectedUser = user;
    jQuery('#newUserModal').modal('show');
  }

  deleteUser(userId):void{
    this.userService.remove(userId);
  }

}
