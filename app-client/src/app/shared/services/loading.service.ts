import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  onloading: boolean;

  // administration services
  loadingRooms: boolean = false;
  loadingReservations: boolean = false;

  // shared services
  loadingUsers: boolean = false;

  constructor(private spinnerService: NgxSpinnerService) { }

  showSpinner(...params: Array<any>){
    if (params != undefined) {
      params.forEach(element => {
        this[element] = true;
      });
    }
    if(!this.onloading){
      this.onloading = true;
      this.spinnerService.show();   
    }
  }
  
  hideSpinner(...params: Array<any>){
    var canHide: boolean = true;

    if (params != undefined) {
      params.forEach(element => {
        this[element] = false;
      });
    }
      
    Object.keys(this).forEach(key => {
      if (key != "onloading" 
        && key != "spinnerService" 
          && this[key]) {
            canHide = false;
        }
      }
    );
    if(this.onloading && canHide){
      this.onloading = false;
      this.spinnerService.hide();   
    }
  }

  unloadSpinner(observable: Observable<any>, loader: string){
    observable.subscribe(
      () => {
        this[loader] = false;
        this.hideSpinner();  
      }
    )
  }
}
