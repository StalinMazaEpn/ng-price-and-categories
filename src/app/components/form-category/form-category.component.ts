import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-category',
  templateUrl: './form-category.component.html',
  styleUrls: ['./form-category.component.scss']
})
export class FormCategoryComponent implements OnInit {

  category = null;
  formControlApp: FormControl;
  modal_event: EventEmitter<any> = new EventEmitter();

  constructor(
    public _bsModalRef: BsModalRef
  ) { }

  ngOnInit(): void {
    this.formControlApp = new FormControl();
    this.formControlApp.patchValue(this.category.name);
  }

  save() {
    this.modal_event.emit({ category: {...this.category, name: this.formControlApp.value} });
    this.close();
  }
  close() {

    this._bsModalRef.hide()
  }

}
