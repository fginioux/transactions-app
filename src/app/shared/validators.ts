import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const MaxDecimal: (maxDecimal) => ValidatorFn = (maxDecimal) => {
  return (ctrl: AbstractControl): ValidationErrors | null => {
    const [,decimal] = `${toFloat(ctrl.value)}`.split('.');
    
    if (decimal && decimal.length > maxDecimal) {
      return {
        maxDecimal
      };
    }
  
    return null;
  };
};

export const toFloat = (value: string | number): number => {
  const str = `${value}`.replace(',', '.');

  return parseFloat(str);
};