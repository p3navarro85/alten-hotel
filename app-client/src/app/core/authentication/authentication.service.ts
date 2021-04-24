import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import decode from 'jwt-decode';
import { ConfigService } from '../../shared/services/config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) { }

  public getToken(): string {
    return localStorage.getItem('token');
  }
  public isAuthenticated() {    
    return this.http.get(`${this.config.getApi('BASEURL')}login`, {
      headers: new HttpHeaders().set('token', this.getToken()),
    });
  }
}
