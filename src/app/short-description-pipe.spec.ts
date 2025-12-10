import { ShortDescriptionPipe } from './short-description-pipe';

describe('ShortDescriptionPipe', () => {
  it('crea una instancia', () => {
    const pipe = new ShortDescriptionPipe();
    expect(pipe).toBeTruthy();
  });

  it('debe devolver el texto original cuando la longitud es menor o igual que maxLength', () => {
    const pipe = new ShortDescriptionPipe();
    const text = 'Texto corto';
    const result = pipe.transform(text, 15);
    expect(result).toBe(text);
  });

  it('debe truncar el texto cuando la longitud excede maxLength', () => {
    const pipe = new ShortDescriptionPipe();
    const text = 'Esta es una descripción muy larga que debe ser cortada';
    const result = pipe.transform(text, 20);
    expect(result).toBe('Esta es una descripci...');
  });

  it('debe usar una maxLength predeterminada de 15 cuando no se especifica', () => {
    const pipe = new ShortDescriptionPipe();
    const text = 'Esta descripción es muy larga';
    const result = pipe.transform(text);
    expect(result).toBe('Esta descripción e...');
  });

  it('debe manejar cadenas vacías', () => {
    const pipe = new ShortDescriptionPipe();
    const result = pipe.transform('', 10);
    expect(result).toBe('');
  });

  it('debe manejar los null o valores indefinidos', () => {
    const pipe = new ShortDescriptionPipe();
    expect(pipe.transform(null as any, 10)).toBe('');
    expect(pipe.transform(undefined as any, 10)).toBe('');
  });
});
