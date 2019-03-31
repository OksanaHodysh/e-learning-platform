import { ChangeDetectionStrategy, Component, forwardRef, OnInit } from '@angular/core';
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
  selector: 'app-duration-calculator',
  templateUrl: './duration-calculator.component.html',
  styleUrls: ['./duration-calculator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DurationCalculatorComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DurationCalculatorComponent),
      multi: true
    }
  ]
})
export class DurationCalculatorComponent implements OnInit, ControlValueAccessor, Validators {

  public duration: FormControl;

  public onTouched: () => void;

  constructor() { }

  ngOnInit() {
    this.duration = new FormControl('', [
      Validators.required,
      Validators.pattern('^[1-9]\\d*$')
    ]);
  }

  writeValue(value: string): void {
    this.duration.setValue(value, { emitEvent: false });
  }

  registerOnChange(fn: any): void {
    this.duration.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.duration.disable() : this.duration.enable();
  }

  validate(c: AbstractControl): ValidationErrors | null {
    return this.duration.valid ? null : this.duration.errors;
  }

}
