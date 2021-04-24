import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Reservation, ReservationState } from '../../../../../shared/models/reservation.model';
import { Room, RoomState } from '../../../../../shared/models/room.model';
import { MessageNotifierService } from '../../../../../shared/services/message-notifier.service';

@Component({
  selector: 'app-admin-new-reservation-form',
  templateUrl: './new-form.component.html',
  styleUrls: ['./new-form.component.scss']
})
export class NewReservationFormComponent implements OnInit {
  @Input() reservation!: Reservation;
  @Input() rooms: Observable<Room[]>;
  numberOfPersons = [0,1,2,3];
  reservationStates = [];

  constructor(
    private cdRef: ChangeDetectorRef,
    private messageNotifier: MessageNotifierService) {}
  
  ngOnInit(): void {
    for (const [key, value] of Object.entries(ReservationState)) {
      let qs = {key, value};
      this.reservationStates.push(qs);
    }
  }

  onChangeRoom($event){
    if(($event.item as Room).state !== RoomState.Available){
      this.messageNotifier.showMessageError('Selected Room is not available', "Please select a different room");
    }else{
      this.reservation.roomId = $event.item.id;
      this.reservation.room = $event.item;
    }
  }

  startedDateChanged($event){
    var date = new Date($event.target.valueAsDate);
    date.setDate(date.getDate()+1);
    this.reservation.startedDate = date;
  }

  endDateChanged($event){
    var date = new Date($event.target.valueAsDate);
    date.setDate(date.getDate()+1);
    this.reservation.endDate = date;
  }

}
