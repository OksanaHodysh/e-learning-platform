import { Pipe, PipeTransform } from '@angular/core';
import { Course } from '../models/course.model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: Array<Course>, search: string): Array<Course> {
    if (!(value.length && search)) {
      return value;
    }

    return value.filter((obj) => obj.title.toLowerCase().indexOf(search.toLowerCase()) > -1);
  }
}
