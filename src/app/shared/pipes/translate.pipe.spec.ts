import { TranslatePipe } from './translate.pipe';

describe('TranslatePipe', () => {
  let pipe: TranslatePipe;

  beforeEach(() => {
    pipe = new TranslatePipe();
  });

  it('should translate a string', () => {
    expect(pipe.transform('home.title').length).not.toEqual(0);
  });

  it('should return empty string if key is undefined', () => {
    spyOn(console, 'warn').and.callFake(() => {});
    expect(pipe.transform('fake').length).toEqual(0);
  });
});