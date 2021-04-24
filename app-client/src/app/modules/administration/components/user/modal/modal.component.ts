import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../../../../shared/models/user.model';
declare var jQuery: any;

@Component({
  selector: 'app-new-user-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalUserComponent implements OnInit {

  @Input() user!: User;
  @Output() onSaveChanges = new EventEmitter();
  @Output() onCancelChanges = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  saveChanges($event): void{
    if(this.validateForm()){
      this.onSaveChanges.emit({ event: $event, user: this.user });
    }
  }
  
  cancelChanges($event): void{
    this.onCancelChanges.emit({ event: $event, user: this.user });
  }

  validateForm():boolean{
    jQuery("#userForm").validate({
      rules: {
        email: {
          required: true,
          email: true
        }
      },
      messages: {
        firstName: "Please enter a user first name.",
        lastName: "Please enter a user last name.",
        email: "Please enter a valid email.",
        password: "Please enter a password for the user.",
        userLevel: "Please enter a user level.",
        role: "Please enter a user role."
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
    jQuery("#userForm").addClass('was-validated');
    return jQuery("#userForm").valid();
  }

}
