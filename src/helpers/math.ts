export const sumNumbers = (a: number, b: number): number => {
  return a + b;
}

export const average = (numbers: number[]): number => {
  const total = numbers.reduce((acc, curr) => acc + curr, 0);
  return total / numbers.length;
}

export const factorial = (n: number): number => {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}