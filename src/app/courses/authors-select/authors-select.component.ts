import { ChangeDetectionStrategy, Component, forwardRef, Input } from '@angular/core';
import { Author } from '../models/author.model';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validators } from '@angular/forms';

const AUTHORS_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AuthorsSelectComponent),
  multi: true,
};

const AUTHORS_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => AuthorsSelectComponent),
  multi: true
};

@Component({
  selector: 'app-authors-select',
  templateUrl: './authors-select.component.html',
  styleUrls: ['./authors-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AUTHORS_ACCESSOR, AUTHORS_VALIDATOR]
})
export class AuthorsSelectComponent implements ControlValueAccessor, Validators {

  @Input() authors: Array<Author> = [];
  @Input() showError: boolean;

  public value: Array<Author>;
  public openSuggestions = false;
  public searchTerm = '';

  public onChange: (value: Array<Author>) => void;
  public onTouched: () => void;

  constructor() { }

  writeValue(value: Array<Author>): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public showSuggestions(show: boolean): void {
    this.openSuggestions = show;
  }

  public addAuthor(author: Author): void {
    this.searchTerm = '';
    this.value = [...this.value, author];
    this.onTouched();
    this.onChange(this.value);
    this.showSuggestions(false);
  }

  public removeAuthor(author: Author): void {
    this.value = this.value.filter(({id}) => id !== author.id);
    this.onTouched();
    this.onChange(this.value);
  }

  validate(c: AbstractControl): ValidationErrors | null {
    return this.value && this.value.length > 0 ? null : {required: true};
  }

}
