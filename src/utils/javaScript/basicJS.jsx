export const getActualDate = (ISODate, wantTimeAgo = true) => {
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

  const date = new Date(ISODate);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minute = date.getMinutes();
  const seconds = date.getSeconds();

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  const currentDate = now.getDate();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentSeconds = now.getSeconds();

  if (!wantTimeAgo) return `${monthsList[convertToNum(month)]} ${day}, ${year}`;

  if (currentYear !== convertToNum(year))
    return `${currentYear - convertToNum(year)} years ago`;

  if (currentMonth !== convertToNum(month))
    return `${currentMonth - convertToNum(month)} months ago`;

  if (currentDate !== convertToNum(day))
    return `${currentDate - convertToNum(day)} days ago`;

  if (currentHour !== convertToNum(hours))
    return `${currentHour - convertToNum(hours)} hours ago`;

  if (currentMinute !== convertToNum(minute))
    return `${currentMinute - convertToNum(minute)} minutes ago`;

  return `${currentSeconds - convertToNum(seconds)} seconds ago`;
};

// if (wantTimeAgo) {
//   if (currentYear === convertToNum(year)) {
//     if (currentMonth === convertToNum(month)) {
//       if (currentDate === convertToNum(day)) {
//         if (currentHour === convertToNum(hours)) {
//           if (currentMinute === convertToNum(minute)) {
//             return `${currentSeconds - convertToNum(seconds)} seconds ago`;
//           } else {
//             return `${currentMinute - convertToNum(minute)} minutes ago`;
//           }
//         } else {
//           return `${currentHour - convertToNum(hours)} hours ago`;
//         }
//       } else {
//         return `${currentDate - convertToNum(day)} days ago`;
//       }
//     } else {
//       return `${currentMonth - convertToNum(month)} months ago`;
//     }
//   } else {
//     return `${currentYear - convertToNum(year)} years ago`;
//   }
// } else {
//   return `${monthsList[convertToNum(month)]} ${day}, ${year}`;
// }
