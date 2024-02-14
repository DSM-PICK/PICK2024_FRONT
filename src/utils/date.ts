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

export function getToday() {
  const formattedMonth = (today.getMonth() + 1).toString().padStart(2, "0");
  const formattedDay = today.getDate().toString().padStart(2, "0");
  return `${today.getFullYear()}-${formattedMonth}-${formattedDay}`;
}
