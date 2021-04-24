import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Room, RoomType, RoomState } from '../../../../../shared/models/room.model';

@Component({
  selector: 'app-admin-new-room-form',
  templateUrl: './new-form.component.html',
  styleUrls: ['./new-form.component.scss']
})
export class NewRoomFormComponent implements OnInit {
  defaultRate: boolean;
  angForm: FormGroup;
  @Input() room!: Room;
  roomTypes = [];
  roomStates = [];

  constructor(private fb: FormBuilder) {
    this.createForm();
  }
  
  ngOnInit(): void {
    for (const [key, value] of Object.entries(RoomType)) {
      let qs = {key, value};
      this.roomTypes.push(qs);
    }

    for (const [key, value] of Object.entries(RoomState)) {
      let qs = {key, value};
      this.roomStates.push(qs);
    }

    console.log('NewFormComponent');
    console.log(this.roomTypes);
  }

  createForm() {
    this.angForm = this.fb.group({
      RoomNumber: ['', Validators.required],
      RoomPrice: ['', Validators.required, [Validators.min(1), Validators.max(999999999)]],
      RoomDescription: ['', Validators.required]
    });
  }

  onChangeRoomBrand($event){
    
  }

}
