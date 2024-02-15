const today = new Date();

export function getWeekDay() {
  switch (today.getDay()) {
    case 0:
      return "일";
    case 1:
      return "월";
    case 2:
      return "화";
    case 3:
      return "수";
    case 4:
      return "목";
    case 5:
      return "금";
    case 6:
      return "토";
    default:
      return "";
  }
}

export function getMonth() {
  return today.getMonth() + 1;
}

export function getDay() {
  return today.getDate();
}

const month = getMonth().toString().padStart(2, "0");
const day = getDay().toString().padStart(2, "0");

export function getFullToday() {
  return `${today.getFullYear()}-${month}-${day}`;
}

export function getToday() {
  return `${month}-${day}`;
}
