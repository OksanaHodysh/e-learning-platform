import { Pipe, PipeTransform } from '@angular/core';
import { Author } from '../models/author.model';

@Pipe({
  name: 'filterAuthors'
})
export class FilterAuthorsPipe implements PipeTransform {

  transform(value: Array<Author>, selectedAuthors: Array<Author>, searchTerm: string = ''): Array<Author> {
    if (!(value.length && selectedAuthors.length)) {
      return value;
    }

    return value.filter((author) => selectedAuthors
      .map(({id}) => id)
      .indexOf(author.id) < 0 &&
      author.name.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0);
  }
}
