import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';
import { Room } from '../../../../../shared/models/room.model';
import { RoomService } from '../../../../../shared/services/room.service';
import { NewRoomFormComponent } from '../new-form/new-form.component';
declare var jQuery: any;

@Component({
  selector: 'app-new-room-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalRoomComponent implements OnInit {
  @ViewChild('closeModal') closeModalElem: ElementRef;
  @ViewChild(NewRoomFormComponent) newFormChild;

  @Input() room!: Room;
  @Output() onSaveChanges = new EventEmitter();
  @Output() onCancelChanges = new EventEmitter();

  constructor(private roomService: RoomService) { }

  ngOnInit(): void{ }

  saveChanges($event): void{
    if(this.validateForm()){
      this.onSaveChanges.emit({ event: $event, room: this.room });
    }
  }
  
  cancelChanges($event): void{
    this.onCancelChanges.emit({ event: $event, room: this.room });
  }

  dismissModal():void{
    this.newFormChild.angForm.reset();
    this.newFormChild.defaultRate = false;
    this.closeModalElem.nativeElement.click();
  }

  validateForm():boolean{
    jQuery("#roomForm").validate({
      messages: {
        roomNumber: "Please enter a valid room number",
        roomPrice: "Please enter a valid room price",
        roomDescription: "Please enter a valid room description"
      },
      highlight: function(element) {
        jQuery(element).closest('.form-group').addClass('has-error');
        jQuery(element).closest('.form-control').addClass(':invalid');
      },
      unhighlight: function(element) {
        jQuery(element).closest('.form-group').removeClass('has-error');
      },
      errorElement: 'span',
      errorClass: 'invalid-feedback',
      errorPlacement: function(error, element) {
        if(element.parent('.input-group').length) {
            error.insertAfter(element.parent());
        } else {
            error.insertAfter(element);
        }
      }
    });
    jQuery("#roomForm").addClass('was-validated');
    return jQuery("#roomForm").valid();
  }

}
