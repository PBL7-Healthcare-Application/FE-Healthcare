const createTimeBooking = (start, end, durationPerAppointment) => {
  var current = new Date();
  var schedule = [];
  for (var i = 0; i < 7; i++) {
    var currentDate = new Date(current);
    currentDate.setDate(currentDate.getDate() + i);
    currentDate.setHours(0, 0, 0, 0);

    const timeArr = [];
    var currentTime = start;
    while (currentTime < end) {
      const time = {
        startTime: formatTime(currentTime),
        endTime: formatTime(addMinutes(currentTime, durationPerAppointment)),
      };
      timeArr.push(time);
      currentTime = addMinutes(currentTime, durationPerAppointment);
    }
    schedule.push({ date: currentDate, times: timeArr });
  }

  return schedule;
};

const addMinutes = (time, minutesToAdd) => {
  var date = new Date();
  date.setHours(parseInt(time), parseInt((time % 1) * 60));
  date.setMinutes(date.getMinutes() + minutesToAdd);
  return date.getHours() + date.getMinutes() / 60;
};

const formatTime = (time) => {
  const hours = Math.floor(time);
  const minutes = Math.round((time % 1) * 60);
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
};
export const convertTime = (time) => {
  const arr = time.split(":");
  return parseInt(arr[0]) + arr[1] / 60;
};
export const doctorSchedule = (
  start,
  end,
  durationPerAppointment,
  timeOff,
  timeBreak
) => {
  const schedule = createTimeBooking(start, end, durationPerAppointment);
  schedule.forEach((time) => {
    timeOff.forEach((off) => {
      if (new Date(time.date).getDate() === new Date(off.date).getDate()) {
        for (var i = time.times.length - 1; i >= 0; i--) {
          var startTime = convertTime(time.times[i].startTime);
          var endTime = convertTime(time.times[i].endTime);

          if (
            startTime === convertTime(off.startTime) &&
            endTime === convertTime(off.endTime)
          ) {
            time.times.splice(i, 1);
          }
        }
      }
    });
  });

  schedule.forEach((time) => {
    timeBreak.forEach((off) => {
      for (var i = time.times.length - 1; i >= 0; i--) {
        var startTime = convertTime(time.times[i].startTime);
        var endTime = convertTime(time.times[i].endTime);

        if (
          startTime === convertTime(off.startTime) &&
          endTime === convertTime(off.endTime)
        ) {
          time.times.splice(i, 1);
        }
      }
    });
  });
  return schedule;
};
export const convertToInt = (time) => {
  if (time) {
    const arr = time.split(":");
    return parseInt(arr[0]);
  } else {
    return null;
  }
};
export const monthNameToNumber = (monthName) => {
  const months = {
    January: 1,
    February: 2,
    March: 3,
    April: 4,
    May: 5,
    June: 6,
    July: 7,
    August: 8,
    September: 9,
    October: 10,
    November: 11,
    December: 12,
  };

  // Convert the month name to its corresponding number
  return months[monthName];
};
export const countTime = (arr, type) => {
  if (arr) {
    var count = 0;
    for (var i = 0; i < arr.length; i++) {
      if (type === "m") {
        if (convertTime(arr[i]?.endTime) < 13) {
          count++;
        }
      }
      if (type === "a") {
        if (
          convertTime(arr[i]?.startTime) >= 13 &&
          convertTime(arr[i]?.endTime) < 18
        ) {
          count++;
        }
      }
      if (type === "e") {
        if (convertTime(arr[i]?.startTime) >= 18) {
          count++;
        }
      }
    }
    return count;
  }
};
