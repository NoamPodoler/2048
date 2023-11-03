export const rotate = (a: number[][]) =>
  a.map((col, c) => a.map((row, r) => a[r][c]).reverse());
