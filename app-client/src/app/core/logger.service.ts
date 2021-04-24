import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfigService } from '../shared/services/config.service';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  private userSubject: BehaviorSubject<any>;
  public user: Observable<any>;

  constructor(
    private router: Router,
    private http: HttpClient,
    private config: ConfigService
  )
  {
    this.userSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): any {
      return this.userSubject.value;
  }

  login(email, password) {
    return this.http.post<any>(`${this.config.getApi('BASEURL')}login`, { email, password })
        .pipe(map(userData => {
            // Store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(userData.user));
            localStorage.setItem('token', userData.token);
            this.userSubject.next(userData);
            return userData;
        }));
  }

  logout() {
    // Remove user from local storage and set current user to null.
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      this.userSubject.next(null);
      this.userSubject.complete();
      this.router.navigate(['home']);
      window.location.reload();
  }

}
