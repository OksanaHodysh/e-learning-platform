import { PaintBorderDirective } from './paint-border.directive';

function getNewDate(numOfDays: number): string {
  const today = new Date();
  const tomorrow = new Date();
  return new Date(tomorrow.setDate(today.getDate() + numOfDays)).toString();
}

describe('PaintBorderDirective', () => {
  let directive: PaintBorderDirective;

  beforeEach(() => {
    directive = new PaintBorderDirective();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should define proper background color for upgoing course', () => {
    directive.creationDate = getNewDate(1);
    directive.ngOnInit();
    expect(directive.borderColor).toBe('blue');
  });

  it('should define proper background color for fresh course', () => {
    directive.creationDate = getNewDate(-3);
    directive.ngOnInit();
    expect(directive.borderColor).toBe('green');
  });

  it('should define proper background color for old course', () => {
    directive.creationDate = getNewDate(-15);
    directive.ngOnInit();
    expect(directive.borderColor).toBe('transparent');
  });
});
