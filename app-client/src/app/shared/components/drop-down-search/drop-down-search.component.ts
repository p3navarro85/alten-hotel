import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, ChangeDetectionStrategy, OnDestroy, AfterContentChecked } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

interface Selectable {
  id: string;
  name: string;
}

@Component({
  selector: 'app-drop-down-search',
  templateUrl: './drop-down-search.component.html',
  styleUrls: ['./drop-down-search.component.scss']
})
export class DropDownSearchComponent implements OnInit, OnDestroy, AfterContentChecked {
  @Input() items!: Observable<Selectable[]>;
  lastBlurred: any;
  showDropDown: boolean;
  searchCriteria: string;
  @Input() inputElement: any;
  @Input() disabled: boolean;
  @Input() required: boolean;
  @Input() hidden: boolean;
  @Input() searchField: string;
  @Input() name: string;
  selectedItem: Selectable;
  @Output() onSelectedItem = new EventEmitter();
  private subscription: Subscription;
  //selectedProduct: Product;

  constructor(private cdRef: ChangeDetectorRef) {
        this.disabled = false;
        this.required = true;
        this.hidden = false;
        this.searchField = "";
        this.name = "";
        this.selectedItem = null;
       }

  ngOnInit(): void {
    this.searchCriteria="";
    this.showDropDown = true;
    this.getNameElement();
  }

  isAcceptedCriteria(option){
    if(this.searchCriteria!==""){
      if(this.searchField.length > 0 
          && option !== undefined 
          && option[this.searchField] !== undefined
          && option[this.searchField] !== null){
        return !option[this.searchField.toLowerCase()].includes(this.searchCriteria.toLowerCase());
      }else if(option['name'] !== undefined 
          && option['name'] !== null
          && option['name'] !== ""){
        return !option.name.toLowerCase().includes(this.searchCriteria.toLowerCase());
      }else{
        return false;
      }
    }
    else return false;
  }
  
  getFocus(){
    this.showDropDown = false;
    this.searchCriteria = "";
  }

  loseFocus(event){
    
    setTimeout(()=>{
      this.showDropDown = true;
      if(this.selectedItem == null){
        this.searchCriteria = "";
      }
    },300);
  }

  selectItem(option){
    this.selectedItem = option;
    if(this.searchField.length > 0){
      this.searchCriteria = option[this.searchField];
    }
    else{
      this.searchCriteria = option.name;
    }
    this.onSelectedItem.emit({item: option});
    this.cdRef.detectChanges();
  }

  getNameElement(){
    this.subscription = this.items.subscribe(
      (items) => {
        const found = items.find(element => element.id == this.inputElement );
        if(found){
          if(this.searchField.length > 0){
            this.searchCriteria = found[this.searchField];
          }
          else{
            this.searchCriteria = found.name;
          }
          this.selectedItem = found;
        }
      }
    )
  }

  ngAfterContentChecked(): void {
    this.cdRef.detectChanges();
  }

    ngOnDestroy() {
      this.subscription.unsubscribe();
    }

}
