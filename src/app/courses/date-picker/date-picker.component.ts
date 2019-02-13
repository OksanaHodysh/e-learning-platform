import { EventEmitter, Component, OnInit, Output, Input } from '@angular/core';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit {
  @Input() date: string;
  @Output() changeDate = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  public setNewDate(event: Event): void {
    this.changeDate.emit((event.target as HTMLInputElement).value);
  }

}
