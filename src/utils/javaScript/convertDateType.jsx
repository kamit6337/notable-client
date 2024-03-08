import addZeroToDigit from "./addZeroToDigit";

const shortMonthList = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const convertDateType = (givenDate) => {
  const updateTheDate = new Date(givenDate);

  const month = updateTheDate.getMonth();
  const date = updateTheDate.getDate();
  const year = updateTheDate.getFullYear();
  const hour = updateTheDate.getHours();
  const minute = updateTheDate.getMinutes();

  return `${shortMonthList[month]} ${addZeroToDigit(
    date
  )}, ${year} - ${addZeroToDigit(hour)}:${addZeroToDigit(minute)}`;
};

export default convertDateType;
