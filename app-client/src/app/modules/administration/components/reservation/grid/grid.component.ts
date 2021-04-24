import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Reservation, ReservationFilter, ReservationState } from '../../../../../shared/models/reservation.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ReservationService } from '../../../../../shared/services/reservation.service';
import { RoomService } from '../../../../../shared/services/room.service';
import { RoomFilter, RoomState } from '../../../../../shared/models/room.model';
declare var jQuery: any;

@Component({
  selector: 'app-administration-reservation-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridReservationComponent implements OnInit, OnDestroy {
  
  reservations$: Observable<{}[]>;
  rooms$: Observable<{}[]>;
  singleReservation$: Observable<Reservation>;
  selectedRow : Number;
  selectedReservation: Reservation;
  onCreate: boolean;
  roomFilter: RoomFilter = new RoomFilter();
  filter: ReservationFilter = new ReservationFilter();
  numberOfPersons = [0,1,2,3];
  reservationStates = [];

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
      private reservationService: ReservationService,
      private roomService: RoomService ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      retrieve: true,
      destroy: true
    };
    
    this.selectedRow = -1;
    this.selectedReservation = null;
    this.reservations$ = this.reservationService.reservations;
    this.reservations$.subscribe(
      () => {
        this.dtTrigger.next();
      }, err => {
        console.log(err);
      });

    this.onCreate = false;

    this.rooms$ = this.roomService.rooms;
    for (const [key, value] of Object.entries(ReservationState)) {
      let qs = {key, value};
      this.reservationStates.push(qs);
    }
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  createReservation(){
    this.selectedReservation = new Reservation();
    this.roomFilter.state = RoomState.Available;
    this.roomService.loadFilteredRoms(this.roomFilter);
    jQuery('#newReservationModal').modal('show'); 
  }

  deleteReservation(reservationId):void{
    this.reservationService.remove(reservationId);
  }

  editReservation(reservation):void{
    this.reservationService.update(reservation);
    this.selectedRow = -1;
  }

  setClickedRow(position, reservation):void{
    this.selectedRow = position;
    this.selectedReservation = reservation;
    this.roomService.loadAll();
    jQuery('#newReservationModal').modal('show');
  }

  cancelEdit(reservation):void{
    this.selectedRow = -1;
    this.selectedReservation = null;
  }

  saveDetailsChanges(event){
    if(event.reservation.id)
    {
      this.reservationService.update(event.reservation);
    }
    else{
      this.reservationService.create(event.reservation);
      this.onCreate = false;
    }
    jQuery('#newReservationModal').modal('hide');
  }

  cancelDetailsChanges(event){
    if(this.onCreate){
      this.reservationService.remove(event.reservation.id);
      this.onCreate = false;
    }  
    this.selectedReservation = null;
    this.selectedRow = -1;
    jQuery('#newReservationModal').modal('hide');
  }

  onChangeRoomFilter($event){
    this.filter.roomId = $event.item.id;
  }

  filterReservations() {
    this.reservationService.loadFilteredReservations(this.filter);
  }

  clearFilter() {
    this.filter = new ReservationFilter();
    this.reservationService.loadAll();
  }

}
