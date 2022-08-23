import moment from "moment";

export const get5MinBeforeTime = (): moment.Moment => {
  let dateObj = new Date();

  let currentDateTime = dateObj.toLocaleString("en-GB", { timeZone: "UTC" });
  const currentDay = currentDateTime.substring(0, 2);
  const currentMonth = currentDateTime.substring(3, 5);
  const currentYear = currentDateTime.substring(6, 10);
  const hour = currentDateTime.substring(12, 14);
  const min = currentDateTime.substring(15, 17);
  const sec = currentDateTime.substring(18, 20);

  const today = moment(
    `${currentMonth}-${currentDay}-${currentYear} ${hour}:${min}:${sec} +0000`,
    "MM-DD-YYYY hh:mm:ss Z"
  );
  var time = moment.duration("00:05:00");
  today.subtract(time);

  return today;
};
