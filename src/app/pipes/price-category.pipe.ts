import { Pipe, PipeTransform } from '@angular/core';
import { ICategoryType } from 'src/app/models/';
import ICategory from '../models/category.model';

@Pipe({
  name: 'price_category'
})
export class PriceCategoryPipe implements PipeTransform {

  transform(value: number, categories: ICategory[]): string {
    const categoryMax = categories.filter(cat => cat.tagname == ICategoryType.MAX)[0];
    const categoryMedium = categories.filter(cat => cat.tagname == ICategoryType.MEDIUM)[0];
    const categoryMin = categories.filter(cat => cat.tagname == ICategoryType.MIN)[0];

    if (value >= categoryMax.limit) {
      return categoryMax.name;
    }
    if (value < categoryMin.limit) {
      return categoryMin.name;
    }
    return categoryMedium.name;
  }

}
