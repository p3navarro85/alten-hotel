import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Reservation, ReservationState } from '../models/reservation.model';
import { ConfigService } from './config.service';
import { LoadingService } from './loading.service';
import { MessageNotifierService } from './message-notifier.service';
import { Room, RoomState } from '../models/room.model';
import { RoomService } from './room.service';
import { mergeMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private _reservations = new BehaviorSubject<Reservation[]>([]);
  private endpoint = 'reservations/';
  private dataStore: { reservations: Reservation[] } = { reservations: [] }; // store our data in memory
  readonly reservations = this._reservations.asObservable();
  private rooms: Room[];

  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private loadingService: LoadingService,
    private messageNotifier: MessageNotifierService,
    private roomService: RoomService) { } 

  loadAll() {
    this.loadingService.showSpinner("loadingReservations");
    this.roomService.loadAllObservable()
      .pipe(
        mergeMap(
          (rooms) => { 
            this.rooms = rooms;
            return this.http.get<Reservation[]>(`${this.config.getApi('BASEURL')+this.endpoint}`);
          }
        )
      )
    .pipe( map(items => items.map(item => Object.assign(new Reservation(), item))) )
    .subscribe(
      data => {
        data.map(
          reservation => {
            reservation.room = 
              this.rooms.find( (room) => room.id === reservation.roomId );
          }
        );
        
        this.dataStore.reservations = data;
        this._reservations.next(Object.assign({}, this.dataStore).reservations);
        this.loadingService.hideSpinner("loadingReservations");
      },
      error => {
        console.log(error);
        this.loadingService.hideSpinner("loadingReservations");
        this.messageNotifier.showMessageError('Could not load reservations', error.message);
        console.log('Could not load reservations.');
      }
    );
  }

  load(id: number | string) {
    this.loadingService.showSpinner("loadingReservations");
    this.http.get<Reservation>(`${this.config.getApi('BASEURL')+this.endpoint+id}`).subscribe(
      data => {
        let notFound = true;
        this.dataStore.reservations.forEach((item, index) => {
          if (item.id === data.id) {
            this.dataStore.reservations[index] = data;
            notFound = false;
          }
        });
        if (notFound) {
          //create a new one
          //this.dataStore.reservations.push(data);
        }
        this._reservations.next(Object.assign({}, this.dataStore).reservations);
        this.loadingService.hideSpinner("loadingReservations");
      },
      error => {
        console.log(error);
        this.loadingService.hideSpinner("loadingReservations");
        this.messageNotifier.showMessageError('Could not load reservation', error.message);
        console.log('Could not load reservation.');
      }
    );
  }

  create(reservation: Reservation) {
    this.loadingService.showSpinner("loadingReservations");
    this.roomService.loadAllObservable()
      .pipe(
        mergeMap(
          (rooms) => { 
            this.rooms = rooms;
            return this.http
            .post<Reservation>(`${this.config.getApi('BASEURL')+this.endpoint+'create'}`, JSON.stringify(reservation),
            {
              headers: new HttpHeaders().set('Content-Type', 'application/json'),
            });
          }
        )
      )
      .subscribe(
        data => {
          data.room = this.rooms.find( (room) => room.id === reservation.roomId );
          if(data.reservationState == ReservationState.Confirmed || 
            data.reservationState == ReservationState.Payed){
            data.room.state = RoomState.Reserved;
            data.room.reservedStartedDate = data.startedDate;
            data.room.reservedEndDate = data.endDate;
          }else{
            data.room.state = RoomState.Available;
            data.room.reservedStartedDate = null;
            data.room.reservedEndDate = null;
          }
          this.roomService.update(data.room, false);
          this.dataStore.reservations.push(data);
          this._reservations.next(Object.assign({}, this.dataStore).reservations);
          this.loadingService.hideSpinner("loadingReservations"); 
          this.messageNotifier.showMessageSuccess('Reservation was successfully created');
        },
        error => {
          console.log(error);
          this.loadingService.hideSpinner("loadingReservations");
          this.messageNotifier.showMessageError('Could not create reservation', error.message);
          console.log('Could not create reservation.');
        }
      );
  }

  update(reservation: Reservation) {
    this.loadingService.showSpinner("loadingReservations");
    let previousRoom: Room = reservation.room;
    this.roomService.loadAllObservable()
      .pipe(
        mergeMap(
          (rooms) => { 
            this.rooms = rooms;
            return this.http
            .put<Reservation>(`${this.config.getApi('BASEURL')+this.endpoint+reservation.id+'/update'}`, JSON.stringify(reservation),
            {
              headers: new HttpHeaders().set('Content-Type', 'application/json'),
            });
          }
        )
      )
      .subscribe(
        data => {
          data.room = this.rooms.find( (room) => room.id === reservation.roomId );
          if(data.reservationState == ReservationState.Confirmed || 
            data.reservationState == ReservationState.Payed){
            data.room.state = RoomState.Reserved;
            data.room.reservedStartedDate = data.startedDate;
            data.room.reservedEndDate = data.endDate;
          }else{
            data.room.state = RoomState.Available;
            data.room.reservedStartedDate = null;
            data.room.reservedEndDate = null;
          }
          this.roomService.update(data.room, false);

          // reservation changed the room, need to free the previous one
          if(previousRoom.number != data.room.number){
            previousRoom.state = RoomState.Available;
            previousRoom.reservedStartedDate = null;
            previousRoom.reservedEndDate = null;
          }

          this.dataStore.reservations.forEach((t, i) => {
            if (t.id === data.id) {
              this.dataStore.reservations[i] = data;
            }
          });

          this._reservations.next(Object.assign({}, this.dataStore).reservations);
          this.loadingService.hideSpinner("loadingReservations"); 
          this.messageNotifier.showMessageSuccess('Reservation was successfully updated');
        },
        error => {
          this.loadingService.hideSpinner("loadingReservations"); 
          this.messageNotifier.showMessageError('Could not update reservation', error.message);
          console.log('Could not update reservation.');
        }
      );
  }

  remove(reservationId: string) {
    this.loadingService.showSpinner("loadingReservations");
    this.http.delete(`${this.config.getApi('BASEURL')+this.endpoint+reservationId+'/delete'}`).subscribe(
      response => {
        let data: Reservation;
        this.dataStore.reservations.forEach((t, i) => {
          if (t.id === reservationId) {
            data = this.dataStore.reservations.splice(i, 1)[0];
          }
        });

        data.room.state = RoomState.Available;
        data.room.reservedStartedDate = null;
        data.room.reservedEndDate = null;
        this.roomService.update(data.room, false);

        this._reservations.next(Object.assign({}, this.dataStore).reservations);
        this.loadingService.hideSpinner("loadingReservations"); 
        this.messageNotifier.showMessageSuccess('Reservation was successfully deleted');
      },
      error => {
        this.loadingService.hideSpinner("loadingReservations"); 
        this.messageNotifier.showMessageError('Could not delete reservation', error.message);
        console.log('Could not delete reservation.');
      }
    );
  }

  loadFilteredReservations(filter: Object = {}) {
    this.loadingService.showSpinner("loadingReservations");
    this.roomService.loadAllObservable()
      .pipe(
        mergeMap(
          (rooms) => { 
            this.rooms = rooms;
            return this.http.post<Reservation[]>(`${this.config.getApi('BASEURL')+this.endpoint+'/filtered'}`, JSON.stringify(filter),
            {
              headers: new HttpHeaders().set('Content-Type', 'application/json'),
            });
          }
        )
      )
      .subscribe(
      data => {
        data.map(
          reservation => {
            reservation.room = 
              this.rooms.find( (room) => room.id === reservation.roomId );
          }
        );
        
        this.dataStore.reservations = data;
        this._reservations.next(Object.assign({}, this.dataStore).reservations);
        this.loadingService.hideSpinner("loadingReservations");
      },
      error => {
        console.log(error);
        this.loadingService.hideSpinner("loadingReservations");
        this.messageNotifier.showMessageError('Could not load reservations', error.message);
        console.log('Could not load reservations.');
      }
    );
  }
}
