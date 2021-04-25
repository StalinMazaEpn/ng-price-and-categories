import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-show-errors',
  templateUrl: './show-errors.component.html',
  styleUrls: ['./show-errors.component.scss']
})
export class ShowErrorsComponent implements OnInit {

  @Input() ctrl: FormControl;
  @Input() messages = {};
  defaultMessageValidation = "Campo Inválido"

  ERROR_MESSAGES = {
    required: () => `Este campo es requerido`,
    min_limit: (error) => (`El valor del límite mínimo debe ser inferior a ${error.maxvalue}`),
    max_limit: (error) => (`El valor del límite máximo debe ser superior a ${error.minvalue}`),
    minlength: (par) => `Minimo ${par.requiredLength} caracteres son requeridos`,
    maxlength: (par) => `Maximo ${par.requiredLength} caracteres son requeridos`,
    pattern: () => `Este campo debe tener un formato valido`,
    alphaNumeric: () => 'Solo se aceptan letras y números sin caracteres especiales',
    numeric: (err) => this.retriveError(err, `Solo se aceptan valores númericos`),
  };

  constructor() {

  }

  retriveError(err: any, defaultMsg: string): string {
    if (err.message) { return err.message }
    return defaultMsg;
  }

  ngOnInit(): void {
    this.ERROR_MESSAGES = { ... this.ERROR_MESSAGES, ...this.messages };
  }

  listOfErrors(): string[] {
    return Object.keys(this.ctrl.errors).map(
      err => {
        if (!this.ERROR_MESSAGES[err]) {
          return this.defaultMessageValidation
        }
        return this.ERROR_MESSAGES[err](this.ctrl.getError(err))
      }
    );
  }

  trackByErrors(indice: number): number { return indice; }

}
