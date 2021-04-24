import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Room, RoomState } from '../models/room.model';
import { ConfigService } from './config.service';
import { LoadingService } from './loading.service';
import { MessageNotifierService } from './message-notifier.service';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private _rooms = new BehaviorSubject<Room[]>([]);
  private endpoint = 'rooms/';
  private dataStore: { rooms: Room[] } = { rooms: [] }; // store our data in memory
  readonly rooms = this._rooms.asObservable();

  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private loadingService: LoadingService,
    private messageNotifier: MessageNotifierService) { } 

  loadAll() {
    this.loadingService.showSpinner("loadingRooms");
    this.http.get<Room[]>(`${this.config.getApi('BASEURL')+this.endpoint}`).subscribe(
      data => {
        this.dataStore.rooms = data;
        this._rooms.next(Object.assign({}, this.dataStore).rooms);
        this.loadingService.hideSpinner("loadingRooms");
      },
      error => {
        console.log(error);
        this.loadingService.hideSpinner("loadingRooms");
        this.messageNotifier.showMessageError('Could not load rooms', error.message);
        console.log('Could not load rooms.');
      }
    );
  }

  loadAllObservable() {
    return this.http.get<Room[]>(`${this.config.getApi('BASEURL')+this.endpoint}`);
  }

  load(id: number | string) {
    this.loadingService.showSpinner("loadingRooms");
    this.http.get<Room>(`${this.config.getApi('BASEURL')+this.endpoint+id}`).subscribe(
      data => {
        let notFound = true;
        this.dataStore.rooms.forEach((item, index) => {
          if (item.id === data.id) {
            this.dataStore.rooms[index] = data;
            notFound = false;
          }
        });
        if (notFound) {
          //create a new one
          //this.dataStore.rooms.push(data);
        }
        this._rooms.next(Object.assign({}, this.dataStore).rooms);
        this.loadingService.hideSpinner("loadingRooms");
      },
      error => {
        console.log(error);
        this.loadingService.hideSpinner("loadingRooms");
        this.messageNotifier.showMessageError('Could not load room', error.message);
        console.log('Could not load room.');
      }
    );
  }

  create(room: Room) {
    this.loadingService.showSpinner("loadingRooms");
    this.http
      .post<Room>(`${this.config.getApi('BASEURL')+this.endpoint+'create'}`, JSON.stringify(room),
      {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      })
      .subscribe(
        data => {
          this.dataStore.rooms.push(data);
          this._rooms.next(Object.assign({}, this.dataStore).rooms);
          this.loadingService.hideSpinner("loadingRooms"); 
          this.messageNotifier.showMessageSuccess('Room was successfully created');
        },
        error => {
          console.log(error);
          this.loadingService.hideSpinner("loadingRooms");
          this.messageNotifier.showMessageError('Could not create room', error.message);
          console.log('Could not create room.');
        }
      );
  }

  update(room: Room, notify=true) {
    this.loadingService.showSpinner("loadingRooms");
    if(room.state == RoomState.Available){
      room.reservedStartedDate = null;
      room.reservedEndDate = null;
    }
    this.http
      .put<Room>(`${this.config.getApi('BASEURL')+this.endpoint+room.id+'/update'}`, JSON.stringify(room),
      {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      })
      .subscribe(
        data => {
          this.dataStore.rooms.forEach((t, i) => {
            if (t.id === data.id) {
              this.dataStore.rooms[i] = data;
            }
          });

          this._rooms.next(Object.assign({}, this.dataStore).rooms);
          this.loadingService.hideSpinner("loadingRooms"); 
          if(notify)
          this.messageNotifier.showMessageSuccess('Room was successfully updated');
        },
        error => {
          this.loadingService.hideSpinner("loadingRooms"); 
          if(notify)
          this.messageNotifier.showMessageError('Could not update room', error.message);
          console.log('Could not update room.');
        }
      );
  }

  remove(roomId: string) {
    this.loadingService.showSpinner("loadingRooms");
    this.http.delete(`${this.config.getApi('BASEURL')+this.endpoint+roomId+'/delete'}`).subscribe(
      response => {
        this.dataStore.rooms.forEach((t, i) => {
          if (t.id === roomId) {
            this.dataStore.rooms.splice(i, 1);
          }
        });

        this._rooms.next(Object.assign({}, this.dataStore).rooms);
        this.loadingService.hideSpinner("loadingRooms"); 
        this.messageNotifier.showMessageSuccess('Room was successfully deleted');
      },
      error => {
        this.loadingService.hideSpinner("loadingRooms"); 
        this.messageNotifier.showMessageError('Could not delete room', error.message);
        console.log('Could not delete room.');
      }
    );
  }

  loadFilteredRoms(filter: Object = {}) {
    this.loadingService.showSpinner("loadingRooms");
    this.http.post<Room[]>(`${this.config.getApi('BASEURL')+this.endpoint+'/filtered'}`, JSON.stringify(filter),
      {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      })
      .subscribe(
      data => {
        this.dataStore.rooms = data;
        this._rooms.next(Object.assign({}, this.dataStore).rooms);
        this.loadingService.hideSpinner("loadingRooms");
      },
      error => {
        console.log(error);
        this.loadingService.hideSpinner("loadingRooms");
        this.messageNotifier.showMessageError('Could not load rooms', error.message);
        console.log('Could not load rooms.');
      }
    );
  }

}
