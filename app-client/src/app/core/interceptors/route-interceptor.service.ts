import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { RoomService } from '../../shared/services/room.service';
import { ReservationService } from '../../shared/services/reservation.service';
import { RoomFilter, RoomState } from '../../shared/models/room.model';

@Injectable({
  providedIn: 'root'
})
export class RouteInterceptorService {

  constructor(
    private router: Router,
    private roomService: RoomService,
    private reservationService: ReservationService
  ) { 
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
          // Show loading indicator
          // console.log('[RouteInterceptorService] Navigation START: ', event.url);
      }

      if (event instanceof NavigationEnd) {
          // Hide loading indicator
          // console.log('[RouteInterceptorService] Navigation END: ', event.url);
          this.loadDataService(event.url);
      }

      if (event instanceof NavigationError) {
          // Hide loading indicator
          // Present error to user
          // console.log('[RouteInterceptorService] Error en navegación', event.error);
      }
    });
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let request = req;
    return next.handle(request);
  }

  loadDataService(url: string){
    switch (url) {
      case '/home':
        let roomFilter: RoomFilter = new RoomFilter();
        roomFilter.state = RoomState.Available;
        this.roomService.loadFilteredRoms(roomFilter);
        break;
      case '/dashboard/administration/rooms':
        this.roomService.loadAll();
        break;
      case '/dashboard/administration/reservations':
        this.roomService.loadAll();
        this.reservationService.loadAll();
        break;
      case '/dashboard':
      break;
      default:
        break;
    }
  }
}
