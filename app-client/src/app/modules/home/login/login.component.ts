import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { LoggerService } from '../../../core/logger.service';
import { MessageNotifierService } from '../../../shared/services/message-notifier.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  errorMessage: string = null;


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private loggerService: LoggerService,
    private messageNotifier: MessageNotifierService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });
  };

  get f() { return this.form.controls; };

  onSubmit() {

    // Stop here if form is invalid
    if (this.form.invalid) {
        return;
    }

    this.loading = true;
    this.loggerService.login(this.f.username.value, this.f.password.value)
        .pipe(first())
        .subscribe(
            data => {
                this.router.navigate(['/dashboard']);
            },
            error => {
                console.log('Error en login: ', error.error.message);
                this.loading = false;
                this.errorMessage = error.error.message;
            });
    }

}
