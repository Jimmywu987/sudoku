export const checkAllGridFilled = (grids: string[]) =>
  grids.every((grid) => Number(grid) > 0);
