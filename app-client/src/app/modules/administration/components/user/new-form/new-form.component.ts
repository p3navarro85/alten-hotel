import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../../../shared/models/user.model';

@Component({
  selector: 'app-admin-new-user-form',
  templateUrl: './new-form.component.html',
  styleUrls: ['./new-form.component.scss']
})
export class NewUserFormComponent implements OnInit  {
  
  angForm: FormGroup;

  @Input() user!: User;
  @Input() showContentGrid!: Boolean;

  constructor(private fb: FormBuilder) {
    this.createForm();
  };

  ngOnInit(): void {
  }

  createForm() {
    this.angForm = this.fb.group({
      firstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Email: ['', Validators.required],
      Password: ['', Validators.required],
      UserLevel: ['', Validators.required],
      Role: ['', Validators.required],
    });
  };

}
