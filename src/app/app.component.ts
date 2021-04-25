import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NumericValueType, ReactiveFormConfig, RxwebValidators } from '@rxweb/reactive-form-validators';

import {
  RXWebValidationMessages,
  DEFAULT_MIN_LIMIT,
  DEFAULT_MAX_LIMIT, AppCategories,
  LIMIT_GROUP_MIN_KEY, LIMIT_GROUP_MAX_KEY
} from "src/app/config";
import { FormCategoryComponent } from './components/form-category/form-category.component';
import ProductsDefault from './data/products.data';
import { ICategoryType, IProduct, ICategory } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  categories: ICategory[] = [...AppCategories];
  products: IProduct[] = [...ProductsDefault];
  currentProduct: IProduct = null;
  priceItemControl: FormControl = new FormControl(3550, [Validators.required, RxwebValidators.numeric({ acceptValue: NumericValueType.PositiveNumber, allowDecimal: true })]);
  limitFormGroup: FormGroup;
  unsuscribeApp = new Subject();

  constructor(
    private _formBuilder: FormBuilder,
    private _modalService: BsModalService
  ) {
    this.categories = this.categories.reverse();
    this.getRandomProduct();
    this.buildForm();
    this.listenFormChanges();
  }

  ngOnInit(): void {
    ReactiveFormConfig.set(RXWebValidationMessages);
  }

  ngOnDestroy(): void {
    this.unsuscribeApp.next();
    this.unsuscribeApp.complete();
  }

  private buildForm(): void {
    this.limitFormGroup = this._formBuilder.group({
      [LIMIT_GROUP_MIN_KEY]: [DEFAULT_MIN_LIMIT, [Validators.required, RxwebValidators.numeric({ acceptValue: NumericValueType.PositiveNumber, allowDecimal: false })]],
      [LIMIT_GROUP_MAX_KEY]: [DEFAULT_MAX_LIMIT, [Validators.required, RxwebValidators.numeric({ acceptValue: NumericValueType.PositiveNumber, allowDecimal: false })]]
    });
  }

  private listenFormChanges(): void {

    this.limitFormGroup.get(LIMIT_GROUP_MIN_KEY).valueChanges.pipe(takeUntil(this.unsuscribeApp)).subscribe((value: number) => {
      const maxvalue = this.limitFormGroup.get(LIMIT_GROUP_MAX_KEY).value;
      if (value >= maxvalue) {
        return this.setErrorOnCategory(LIMIT_GROUP_MIN_KEY, { min_limit: { error: true, value, maxvalue } });
      }
      this.updateCategory(ICategoryType.MIN, { limit: value });
    });

    this.limitFormGroup.get(LIMIT_GROUP_MAX_KEY).valueChanges.pipe(takeUntil(this.unsuscribeApp)).subscribe((value: number) => {
      const minvalue = this.limitFormGroup.get(LIMIT_GROUP_MIN_KEY).value;

      if (value <= minvalue) {
        return this.setErrorOnCategory(LIMIT_GROUP_MAX_KEY, { max_limit: { error: true, value, minvalue } });
      }
      this.updateCategory(ICategoryType.MAX, { limit: value });
    });
  }

  private setErrorOnCategory(formControlName: string, error_state: any): void {
    this.limitFormGroup.controls[formControlName].setErrors(error_state);
    return null;
  }
  private getProductIndexRandom(): number {
    return Math.floor(Math.random() * this.products.length);
  }

  private updateCategory(tagname: string, data: any): void {
    this.categories = this.categories.map((cat) => {
      if (cat.tagname == tagname) {
        return { ...cat, ...data }
      }
      return cat;
    });
  }

  editCategory(category: any) {
    const modalRef: BsModalRef = this._modalService.show(FormCategoryComponent, { initialState: { category } });
    modalRef.content.modal_event.subscribe((data: any) => {
      if (data.category) {
        this.updateCategory(category.tagname, data.category);
      }
    });
  }

  getRandomProduct() {
    const lastIndex = this.products.findIndex(product => product.name == this.currentProduct?.name);
    let nextIndex = null;
    do {
      nextIndex = this.getProductIndexRandom();
    } while (lastIndex === nextIndex);
    this.currentProduct = this.products[nextIndex];
  }

  trackByIndex(index: number) {
    return index;
  }

}
