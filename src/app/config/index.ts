import { ICategoryType } from 'src/app/models/';
export const RXWebValidationMessages = {
  "validationMessage": {
    "required": "Este campo es requerido",
    "minLength": "el tamaño minimo es {{0}}",
    "maxLength": "el tamaño maximo permitido es {{0}}",
    "numeric": "solo se permiten valores númericos"
  }
};

export const DEFAULT_MIN_LIMIT = 2000;
export const DEFAULT_MAX_LIMIT = 5000;
export const LIMIT_GROUP_MIN_KEY = "minimium_limit";
export const LIMIT_GROUP_MAX_KEY = "maximum_limit"

export const AppCategories = [
  { name: "Alto", tagname: ICategoryType.MAX, limit: DEFAULT_MAX_LIMIT, desc: "Un precio pertenece a este segmento si su valor supera el limite máximo" },
  { name: "Medio", tagname: ICategoryType.MEDIUM, limit: null, desc: "Un precio pertenece a este segmento si su valor es menor al limite máximo y mayor o igual al límite mínimo " },
  { name: "Bajo", tagname: ICategoryType.MIN, limit: DEFAULT_MIN_LIMIT, desc: "Un precio pertenece a este segmento si su valor es inferior el limite mínimo" },
];
