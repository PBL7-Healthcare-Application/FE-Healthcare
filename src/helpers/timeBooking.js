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

export const addMinutes = (time, minutesToAdd) => {
  var date = new Date();
  date.setHours(parseInt(time), parseInt((time % 1) * 60));
  date.setMinutes(date.getMinutes() + minutesToAdd);
  return date.getHours() + date.getMinutes() / 60;
};

export const formatTime = (time) => {
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
  timeBreak,
  slotAppointments
) => {
  const schedule = createTimeBooking(start, end, durationPerAppointment);
  schedule.forEach((time) => {
    timeOff.forEach((off) => {
      if (compareDate(time.date, off.date)) {
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
  schedule.forEach((time) => {
    let count = 0;
    slotAppointments.forEach((slot) => {

      if (compareDate(time.date, slot.date)) {
        for (var i = time.times.length - 1; i >= 0; i--) {
          var startTime = convertTime(time.times[i].startTime);
          var endTime = convertTime(time.times[i].endTime);

          if (
            startTime === convertTime(slot.startTime) &&
            endTime === convertTime(slot.endTime)
          ) {
            time.times[i].isBooking = true;
            count++;
          }
        }
        time.count = count;
      }
    });

  });


  var current = new Date();
  var currentDate = new Date(current);
  schedule.forEach((time) => {
    if (compareDate(time.date, currentDate)) {
      for (var i = time.times.length - 1; i >= 0; i--) {
        var startTime = convertTime(time.times[i].startTime);
        if (startTime - current.getHours() < 5) {
          time.times.splice(i, 1);
        }
      }
    }
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

export const formatDate = (gmtDateString) => {
  const data = new Date(gmtDateString);
  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  const convertDate = data.toLocaleDateString("en-US", options);
  return convertDate;
};


export const timeSchedule = (start, end, durationPerAppointment) => {


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


  return timeArr;
};

export const viewSchedule = (timeOff, appointment, day, time) => {
  const schedule = [
    ...timeOff,
    ...appointment
  ]


  let newDate = null;
  if (day) {
    newDate = day.split("T")[0];
  }
  const timeArr = time.split(" - ");
  const item = schedule.find((item) => {
    if (item.date.split("T")[0] === newDate && item.startTime === timeArr[0] && item.endTime === timeArr[1]) {
      return item;
    }
  })
  if (item) {
    if (item.idTimeOff) {
      if (item.status === 1) {
        return "busy"
      }
      else {
        return "break"
      }
    }
    else {
      return "examination"

    }
  }
  else {
    return null;
  }

}

export const viewInforSchedule = (appointment, day, time) => {



  let newDate = null;
  if (day) {
    newDate = day.split("T")[0];
  }

  const timeArr = time.split(" - ");
  const item = appointment.find((item) => {
    if (item.date.split("T")[0] === newDate && item.startTime === timeArr[0] && item.endTime === timeArr[1]) {
      return item;
    }
  })
  if (item) {
    return {
      ...item
    }
  }
  else {
    return null;
  }

}

export const viewBreakTime = (timeOff, time) => {




  const timeArr = time.split(" - ");
  const item = timeOff.find((item) => {
    if (item.startTime === timeArr[0] && item.endTime === timeArr[1]) {
      return item;
    }
  })
  if (item) {
    //
    if (item.status === 2) {
      return "break"
    }
    else {
      return null
    }
  }
  else {
    return null;
  }

}

export const viewInforTimeOff = (timeOff, day, time) => {



  let newDate = null;
  if (day) {
    newDate = day.split("T")[0];
  }

  const timeArr = time.split(" - ");
  const item = timeOff.find((item) => {
    if (item.date.split("T")[0] === newDate && item.startTime === timeArr[0] && item.endTime === timeArr[1]) {
      return item;
    }
  })
  if (item) {

    if (item.status === 1) {
      return item.reason
    }
    else {
      return null
    }


  }
  else {
    return null;
  }

}

const compareDate = (date1, date2) => {
  const newDate1 = new Date(date1);
  const newDate2 = new Date(date2);
  if (newDate1.getDate() === newDate2.getDate() && newDate1.getMonth() === newDate2.getMonth() && newDate1.getFullYear() === newDate2.getFullYear()) {
    return true;
  }
  else {
    return false;
  }
}

export const compareTime = (time) => {
  const timeArr = time.split(" - ");
  var current = new Date();
  var startTime = convertTime(timeArr[0]);
  if (startTime - current.getHours() < 0) {
    return true
  }
  else {
    return false
  }

}