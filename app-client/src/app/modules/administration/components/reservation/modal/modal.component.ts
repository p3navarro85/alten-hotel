import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';
import { Reservation } from '../../../../../shared/models/reservation.model';
import { ReservationService } from '../../../../../shared/services/reservation.service';
import { NewReservationFormComponent } from '../new-form/new-form.component';
import { Observable } from 'rxjs';
import { Room } from '../../../../../shared/models/room.model';
declare var jQuery: any;

@Component({
  selector: 'app-new-reservation-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalReservationComponent implements OnInit {
  @ViewChild('closeModal') closeModalElem: ElementRef;
  @ViewChild(NewReservationFormComponent) newFormChild;

  @Input() reservation!: Reservation;
  @Input() rooms: Observable<Room[]>;
  @Output() onSaveChanges = new EventEmitter();
  @Output() onCancelChanges = new EventEmitter();

  constructor(private reservationService: ReservationService) { }

  ngOnInit(): void{ }

  saveChanges($event): void{
    console.log('saveChanges');
    console.log(this.reservation);
    if(this.validateForm()){
      this.onSaveChanges.emit({ event: $event, reservation: this.reservation });
    }
  }
  
  cancelChanges($event): void{
    this.onCancelChanges.emit({ event: $event, reservation: this.reservation });
  }

  dismissModal():void{
    this.newFormChild.angForm.reset();
    this.newFormChild.defaultRate = false;
    this.closeModalElem.nativeElement.click();
  }

  validateForm():boolean{
    console.log('validateForm');
    jQuery("#reservationForm").validate({
      rules: {
        ownerEmail: {
          required: true,
          email: true
        }
      },
      messages: {
        startedDate: "Please enter a valid started date",
        endDate: "Please enter a valid end date",
        ownerEmail: "Please enter a valid owner email"
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
    jQuery("#reservationForm").addClass('was-validated');
    return jQuery("#reservationForm").valid();
  }

}
