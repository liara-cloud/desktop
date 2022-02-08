const latinToPersianMap = ["۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", "۰"];
const latinNumbers = [
  /1/g,
  /2/g,
  /3/g,
  /4/g,
  /5/g,
  /6/g,
  /7/g,
  /8/g,
  /9/g,
  /0/g,
];
const arabicToPersianMap = ["۴", "۵", "۶"];
const arabicNumbers = [/٤/g, /٥/g, /٦/g];

export function toPersianDigits(string) {
  let result = String(string);

  for (let index = 0; index < 10; index++) {
    result = result.replace(latinNumbers[index], latinToPersianMap[index]);
  }

  return result;
}