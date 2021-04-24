import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropDownSearchComponent } from './components/drop-down-search/drop-down-search.component';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';
import { ModalMessageComponent } from './components/modal-message/modal-message.component';
import { DisableDirective } from './directives/disable.directive';


@NgModule({
  declarations: [ DropDownSearchComponent, ModalMessageComponent, DisableDirective ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [DropDownSearchComponent, ModalMessageComponent, DisableDirective]
})
export class SharedModule { }
