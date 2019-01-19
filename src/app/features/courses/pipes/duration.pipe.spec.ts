import { DurationPipe } from './duration.pipe';

describe('DurationPipe', () => {
  let pipe: DurationPipe;

  beforeEach(() => {
    pipe = new DurationPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return only minutes formatted', () => {
    expect(pipe.transform(23)).toBe('23min');
  });

  it('should return both hours and minutes formatted', () => {
    expect(pipe.transform(73)).toBe('1h 13min');
  });

  it('should return 0 minutes formatted', () => {
    expect(pipe.transform(0)).toBe('0min');
  });
});
