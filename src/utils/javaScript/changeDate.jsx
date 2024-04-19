const changeDate = (UTCDate, ago = false) => {
  const convertToNum = (num) => {
    return parseInt(num, 10);
  };

  const monthsList = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = new Date(UTCDate);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  const currentDate = now.getDate();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentSeconds = now.getSeconds();

  if (!ago) {
    return `${monthsList[convertToNum(month)]} ${day}, ${year}`;
  }

  if (currentYear !== convertToNum(year)) {
    return `${currentYear - convertToNum(year)} years ago`;
  }

  if (currentMonth !== convertToNum(month)) {
    return `${currentMonth - convertToNum(month)} months ago`;
  }

  if (currentDate !== convertToNum(day)) {
    return `${currentDate - convertToNum(day)} days ago`;
  }

  if (currentHour !== convertToNum(hours)) {
    return `${currentHour - convertToNum(hours)} hrs ago`;
  }

  return `${currentMinute - convertToNum(minutes)} min ago`;
};

export default changeDate;
