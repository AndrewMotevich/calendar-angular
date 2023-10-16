const months: { [key: string]: number } = {
  января: 0,
  февраля: 1,
  марта: 2,
  апреля: 3,
  мая: 4,
  июня: 5,
  июля: 6,
  августа: 7,
  сентября: 8,
  октября: 9,
  ноября: 10,
  декабря: 11,
};

export function parseRussianDate(dateString: string) {
  const [day, monthName] = dateString.toLocaleLowerCase().split(' ');
  const year = new Date().getFullYear();
  const month = months[monthName];

  if (month !== undefined) {
    const date = new Date(year, month, Number(day));
    if (!isNaN(date.getTime())) {
      return date;
    }
  }
  return null;
}
