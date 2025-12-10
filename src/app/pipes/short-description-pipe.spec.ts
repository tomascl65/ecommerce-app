import { ShortDescriptionPipe } from './short-description-pipe';

describe('ShortDescriptionPipe', () => {
  it('create an instance', () => {
    const pipe = new ShortDescriptionPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return original text when length is less than or equal to maxLength', () => {
    const pipe = new ShortDescriptionPipe();
    const text = 'Texto corto';
    const result = pipe.transform(text, 15);
    expect(result).toBe(text);
  });

  it('should truncate text when length exceeds maxLength', () => {
    const pipe = new ShortDescriptionPipe();
    const text = 'Esta es una descripción muy larga que debe ser cortada';
    const result = pipe.transform(text, 20);
    expect(result).toBe('Esta es una descripci...');
  });

  it('should use default maxLength of 15 when not specified', () => {
    const pipe = new ShortDescriptionPipe();
    const text = 'Esta descripción es muy larga';
    const result = pipe.transform(text);
    expect(result).toBe('Esta descripción e...');
  });

  it('should handle empty string', () => {
    const pipe = new ShortDescriptionPipe();
    const result = pipe.transform('', 10);
    expect(result).toBe('');
  });

  it('should handle null or undefined values', () => {
    const pipe = new ShortDescriptionPipe();
    expect(pipe.transform(null as any, 10)).toBe('');
    expect(pipe.transform(undefined as any, 10)).toBe('');
  });
});
