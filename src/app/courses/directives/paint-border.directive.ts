import { Directive, Input, OnInit, HostBinding } from '@angular/core';

@Directive({
  selector: '[appPaintBorder]'
})
export class PaintBorderDirective implements OnInit {
  @Input('appPaintBorder') date: string;
  @HostBinding('style.borderColor') borderColor = 'transparent';

  constructor() {}

  ngOnInit() {
    this.defineBorderColor();
  }

  private defineBorderColor(): void {
    const dayDuration = 24 * 60 * 60 * 1000;
    const courseDate = new Date(this.date);
    const diff = Math.floor((Date.now() - courseDate.getTime()) / dayDuration);

    if (diff < 0) {
      this.borderColor = 'blue';
    } else if (diff <= 14) {
      this.borderColor = 'green';
    }
  }

}
