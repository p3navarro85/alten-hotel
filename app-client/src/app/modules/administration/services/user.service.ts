import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../../shared/models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../../../shared/services/config.service';
import { LoadingService } from '../../../shared/services/loading.service';
import { MessageNotifierService } from '../../../shared/services/message-notifier.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _users = new BehaviorSubject<User[]>([]);
  private endpoint = 'users/';
  private dataStore: { users: User[] } = { users: [] }; // store our data in memory
  readonly users = this._users.asObservable();

  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private loadingService: LoadingService,
    private messageNotifier: MessageNotifierService
  ) { };

  loadAll() {
    this.loadingService.showSpinner("loadingUsers");
    this.http.get<User[]>(`${this.config.getApi('BASEURL')+this.endpoint}`).subscribe(
      data => {
        this.dataStore.users = data;
        this._users.next(Object.assign({}, this.dataStore).users);
        this.loadingService.hideSpinner("loadingUsers");
      },
      error => {
        console.log(error);
        this.loadingService.hideSpinner("loadingUsers");
        this.messageNotifier.showMessageError('Could not load users', error.message);
        console.log('Could not load users.');
      }
    );
  }

  loadAllObservable() {
    return this.http.get<User[]>(`${this.config.getApi('BASEURL')+this.endpoint}`);
  }

  create(user: User) {
    this.loadingService.showSpinner("loadingUsers");
    this.http
      .post<User>(`${this.config.getApi('BASEURL')+this.endpoint+'create'}`, JSON.stringify(user),
      {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      })
      .subscribe(
        data => {
          this.dataStore.users.push(data);
          this._users.next(Object.assign({}, this.dataStore).users);
          this.loadingService.hideSpinner("loadingUsers");
          this.messageNotifier.showMessageSuccess("User was successfully created");
        },
        error => {
          console.log(error);
          this.loadingService.hideSpinner("loadingUsers");
          this.messageNotifier.showMessageError('Could not create user', error.message);
          console.log('Could not create user.');
        }
      );
  }

  update(user: User) {
    this.loadingService.showSpinner("loadingUsers");
    this.http
      .put<User>(`${this.config.getApi('BASEURL')+this.endpoint+user.id+'/update'}`, JSON.stringify(user),
      {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      })
      .subscribe(
        data => {
          this.dataStore.users.forEach((t, i) => {
            if (t.id === data.id) {
              this.dataStore.users[i] = data;
            }
          });

          this._users.next(Object.assign({}, this.dataStore).users);
          this.loadingService.hideSpinner("loadingUsers");
          this.messageNotifier.showMessageSuccess("User was successfully updated");
        },
        error => {
          console.log(error);
          this.loadingService.hideSpinner("loadingUsers");
          this.messageNotifier.showMessageError('Could not update user', error.message);
          console.log('Could not update user.');
        }
      );
  }

  remove(userId: string) {
    this.loadingService.showSpinner("loadingUsers");
    this.http.delete(`${this.config.getApi('BASEURL')+this.endpoint+userId+'/delete'}`).subscribe(
      response => {
        this.dataStore.users.forEach((t, i) => {
          if (t.id === userId) {
            this.dataStore.users.splice(i, 1);
          }
        });

        this._users.next(Object.assign({}, this.dataStore).users);
        this.loadingService.hideSpinner("loadingUsers");
        this.messageNotifier.showMessageSuccess("User was successfully deleted");
      },
      error => {
        console.log(error);
        this.loadingService.hideSpinner("loadingUsers");
        this.messageNotifier.showMessageError('Could not delete user', error.message);
        console.log('Could not delete user.');
      }
    );
  }

}
