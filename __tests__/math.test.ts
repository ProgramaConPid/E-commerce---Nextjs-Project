import { sumNumbers, average, factorial } from "@/helpers/math"; 

describe('sum', () => {
  it('suma números', () => {
    expect(sumNumbers(2, 3)).toBe(5);
  });

  it('maneja negativos', () => {
    expect(sumNumbers(-2, 3)).toBe(1);
  });
});

describe('average', () => {
  it('calcula el promedio correctamente', () => {
    expect(average([2, 4, 6])).toBe(4);
  });

  it('maneja un array vacío', () => {
    expect(average([])).toBeNaN();
  });
});

describe('factorial', () => {
  it('calcula el factorial correctamente', () => {
    expect(factorial(5)).toBe(120);
  });

  it('factorial de 0 es 1', () => {
    expect(factorial(0)).toBe(1);
  });
});
