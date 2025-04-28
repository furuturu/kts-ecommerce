export function getTovarEnding(count: number): string {
  const lastTwoDigits = Math.abs(count) % 100;
  const lastDigit = lastTwoDigits % 10;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return "позиций";
  }

  switch (lastDigit) {
    case 1:
      return "позиция";
    case 2:
    case 3:
    case 4:
      return "позиции";
    default:
      return "позиций";
  }
}
