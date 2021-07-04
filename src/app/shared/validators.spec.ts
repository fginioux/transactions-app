import { MaxDecimal, toFloat } from './validators';

describe('Validator:MaxDecimal', () => {
  it('should validate a number', () => {
    expect(MaxDecimal(2)({value: '12.34'} as any)).toEqual(null);
    expect(MaxDecimal(4)({value: '12.3488'} as any)).toEqual(null);
    expect(MaxDecimal(2)({value: '12.3'} as any)).toEqual(null);
    expect(MaxDecimal(2)({value: '12'} as any)).toEqual(null);
  });

  it('should not validate a number', () => {
    expect(MaxDecimal(2)({value: '12.348'} as any)).not.toEqual(null);
    expect(MaxDecimal(4)({value: '12.34899'} as any)).not.toEqual(null);
    expect(MaxDecimal(0)({value: '12.3'} as any)).not.toEqual(null);
  });
});

describe('toFloat', () => {
  it('should transform a string to float', () => {
    expect(toFloat(12.67)).toEqual(12.67);
    expect(toFloat('12.67')).toEqual(12.67);
    expect(toFloat('12,67')).toEqual(12.67);
  });
});