import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-duration-calculator',
  templateUrl: './duration-calculator.component.html',
  styleUrls: ['./duration-calculator.component.scss']
})
export class DurationCalculatorComponent implements OnInit {
  @Input() duration: string;
  @Output() changeDuration = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  public setDuration(event: Event): void {
    this.changeDuration.emit(+(event.target as HTMLInputElement).value);
  }

}
