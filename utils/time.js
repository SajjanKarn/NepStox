function convertTimestampToTime(timestamp) {
  const date = new Date(timestamp * 1000);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  let hours12 = hours % 12;
  hours12 = hours12 ? hours12 : 12;

  const time12 = `${hours12}:${minutes.toString().padStart(2, "0")} ${ampm}`;
  return time12;
}

function getTimeStamp(hour) {
  const currentDate = new Date();
  currentDate.setHours(hour, 0, 0, 0);
  return Math.floor(currentDate.getTime() / 1000);
}

function getTimeStampOneDayBefore(hour) {
  const currentDate = new Date();
  currentDate.setTime(currentDate.getTime() - 24 * 60 * 60 * 1000); // Subtract 24 hours
  currentDate.setHours(hour, 0, 0, 0);
  return Math.floor(currentDate.getTime() / 1000);
}

function parseTimestamp(timestamp) {
  const date = new Date(timestamp * 1000);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  const formattedTime = `${hours}:${minutes}:${seconds}`;

  return `${formattedDate} ${formattedTime}`;
}

function getTimeStampOfDate(date, hour) {
  const parts = date.split("-"); // Assuming date is in 'YYYY-MM-DD' format
  const year = parseInt(parts[0]);
  const month = parseInt(parts[1]) - 1; // Months in JavaScript are zero-indexed
  const day = parseInt(parts[2]);

  const currentDate = new Date(year, month, day);
  currentDate.setHours(hour, 0, 0, 0);
  return Math.floor(currentDate.getTime() / 1000);
}

export {
  convertTimestampToTime,
  getTimeStamp,
  getTimeStampOneDayBefore,
  parseTimestamp,
  getTimeStampOfDate,
};
