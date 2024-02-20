function utcToMilliseconds(utcDate) {
  // Create a new Date object from the UTC date string
  const date = new Date(utcDate);
  // Get the Unix timestamp in seconds
  const unixTimestamp = date.getTime() / 1000;
  // Convert Unix timestamp to milliseconds
  const milliseconds = unixTimestamp * 1000;
  return milliseconds;
}

const yearInMilli = 1000 * 60 * 60 * 24 * 365;
const monthInMilli = yearInMilli / 12;
const weekInMilli = monthInMilli / 4;
const dayInMilli = weekInMilli / 7;
const hourInMilli = dayInMilli / 24;
const minuteInMilli = hourInMilli / 60;
const secondinMilli = minuteInMilli / 60;

const timeAgoDate = (UTCDate) => {
  const givenMilliseconds = utcToMilliseconds(UTCDate);
  const currentTimeInMilli = Date.now();
  const diffInMilli = currentTimeInMilli - givenMilliseconds;

  if (diffInMilli > yearInMilli) {
    return `${Math.floor(diffInMilli / yearInMilli)} yrs ago`;
  }

  if (diffInMilli > monthInMilli) {
    return `${Math.floor(diffInMilli / monthInMilli)} months ago`;
  }

  if (diffInMilli > weekInMilli) {
    return `${Math.floor(diffInMilli / weekInMilli)} weeks ago`;
  }

  if (diffInMilli > dayInMilli) {
    return `${Math.floor(diffInMilli / dayInMilli)} days ago`;
  }

  if (diffInMilli > hourInMilli) {
    return `${Math.floor(diffInMilli / hourInMilli)} hrs ago`;
  }

  if (diffInMilli > minuteInMilli) {
    return `${Math.floor(diffInMilli / minuteInMilli)} min ago`;
  }

  return `${Math.floor(diffInMilli / secondinMilli)} sec ago`;
};

export default timeAgoDate;
