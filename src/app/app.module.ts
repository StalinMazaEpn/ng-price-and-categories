import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { FormCategoryComponent } from './components/form-category/form-category.component';
import { ShowErrorsComponent } from './components/show-errors/show-errors.component';
import { PriceCategoryPipe } from './pipes/price-category.pipe';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    FormCategoryComponent,
    ShowErrorsComponent,
    PriceCategoryPipe,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RxReactiveFormsModule,
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
