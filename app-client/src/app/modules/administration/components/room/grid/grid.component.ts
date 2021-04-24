import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Room, RoomFilter, RoomType, RoomState } from '../../../../../shared/models/room.model';
import { HttpErrorResponse } from '@angular/common/http';
import { RoomService } from '../../../../../shared/services/room.service';
declare var jQuery: any;

@Component({
  selector: 'app-administration-room-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridRoomComponent implements OnInit, OnDestroy {

  rooms$: Observable<{}[]>;
  singleRoom$: Observable<Room>;
  selectedRow : Number;
  selectedRoom: Room;
  onCreate: boolean;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  filter: RoomFilter = new RoomFilter();

  roomTypes = [];
  roomStates = [];

  constructor(
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
    this.selectedRoom = null;
    this.rooms$ = this.roomService.rooms;
    this.rooms$.subscribe(
      () => {
        this.dtTrigger.next();
      }, err => {
        console.log(err);
      });

    this.onCreate = false;

    for (const [key, value] of Object.entries(RoomType)) {
      let qs = {key, value};
      this.roomTypes.push(qs);
    }

    for (const [key, value] of Object.entries(RoomState)) {
      let qs = {key, value};
      this.roomStates.push(qs);
    }
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  createRoom(){
    this.selectedRoom = new Room();
    jQuery('#newRoomModal').modal('show'); 
  }

  deleteRoom(roomId):void{
    this.roomService.remove(roomId);
  }

  editRoom(room):void{
    this.roomService.update(room);
    this.selectedRow = -1;
  }

  setClickedRow(position, room):void{
    this.selectedRow = position;
    this.selectedRoom = room;
    jQuery('#newRoomModal').modal('show');
  }

  cancelEdit(room):void{
    this.selectedRow = -1;
    this.selectedRoom = null;
  }

  saveDetailsChanges(event){
    if(event.room.id)
    {
      this.roomService.update(event.room);
    }
    else{
      this.roomService.create(event.room);
      this.onCreate = false;
    }
    jQuery('#newRoomModal').modal('hide');
  }

  cancelDetailsChanges(event){
    if(this.onCreate){
      this.roomService.remove(event.room.id);
      this.onCreate = false;
    }  
    this.selectedRoom = null;
    this.selectedRow = -1;
    jQuery('#newRoomModal').modal('hide');
  }

  filterRooms() {
    this.roomService.loadFilteredRoms(this.filter);
  }

  clearFilter() {
    this.filter = new RoomFilter();
    this.roomService.loadAll();
  }

}
