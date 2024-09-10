// Function to get the difference between two dates
export const getDateDiff = (
  date1: Date,
  date2: Date
): { day: number; hour: number; minute: number; second: number } => {
  const diff = new Date(date2.getTime() - date1.getTime());
  return {
    day: diff.getUTCDate() - 1,
    hour: diff.getUTCHours(),
    minute: diff.getUTCMinutes(),
    second: diff.getUTCSeconds(),
  };
};

// Function to format a date as "DD-MM"
export const formatDate = (date: Date | string): string => {
  const d = new Date(date);
  let day = d.getDate().toString();

  if (day.length < 2) day = "0" + day;

  return [day].join("-");
};

// Function to format a date string into a more readable format
export const formatDate1 = (dateString: string): string => {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear().toString().slice(-2);

  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  const formattedHour = hours % 12 || 12;

  // Calculate suffix for the day
  const daySuffix =
    day === 1 || day === 21 || day === 31
      ? "st"
      : day === 2 || day === 22
      ? "nd"
      : day === 3 || day === 23
      ? "rd"
      : "th";

  return `${day}${daySuffix} ${month}'${year} ${formattedHour}:${minutes} ${ampm}`;
};
