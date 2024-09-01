export const getTextColor = (color: string) => {
  const hex = color?.replace('#', '');

  const g = parseInt(hex?.substring(2, 4), 16);
  const r = parseInt(hex?.substring(0, 2), 16);
  const b = parseInt(hex?.substring(4, 6), 16);

  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  return brightness > 125 ? 'black' : 'white';
};
