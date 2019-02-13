import { Pipe, PipeTransform } from '@angular/core';
import { Course } from '../course.model';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(value: Array<Course>, fieldName: string): Array<Course> {
    if (!(value.length && fieldName)) {
      return value;
    }

    if (fieldName === 'creationDate') {
      value.sort((obj1, obj2) => new Date(obj1[fieldName]).getTime() - new Date(obj2[fieldName]).getTime());
    } else {
      value.sort((obj1, obj2) => obj1[fieldName] > obj2[fieldName] ? 1 : -1);
    }
    return value;
  }

}
