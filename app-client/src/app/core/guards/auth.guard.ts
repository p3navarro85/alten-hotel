import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {};

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.isAuthenticated().pipe(map((response: { ok: boolean }) => {
        // return true;
        if (response.ok) {
            return true;
        }
        this.router.navigate(['home']);
        return false;
      }), catchError((error) => {
        console.log('[GUARD] Response ERROR.');
        this.router.navigate(['home']);
        return of(true);
    }));
}
  
}
