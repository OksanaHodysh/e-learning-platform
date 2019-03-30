import { Component, forwardRef, OnInit } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true
    }
  ]
})
export class DatePickerComponent implements OnInit, ControlValueAccessor, Validators {

  public date: FormControl;

  public onTouched: () => void;

  constructor() { }

  ngOnInit(): void {
    this.date = new FormControl('', Validators.required);
  }

  writeValue(value: string): void {
    this.date.setValue(value, { emitEvent: false });
  }

  registerOnChange(fn: any): void {
    this.date.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.date.disable() : this.date.enable();
  }

  validate(c: AbstractControl): ValidationErrors | null {
    return this.date.valid ? null : this.date.errors;
  }
}
