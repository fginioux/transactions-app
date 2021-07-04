import { DateFormatPipe } from './date-format.pipe';

describe('DateFormatPipe', () => {
  let pipe: DateFormatPipe;

  beforeEach(() => {
    pipe = new DateFormatPipe();
  });

  it('should format a date', () => {
    expect(pipe.transform('2021-07-04')).toEqual('04.07.2021');
  });
});