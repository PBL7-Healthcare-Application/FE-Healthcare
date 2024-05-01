

const createTimeBooking = (start, end, durationPerAppointment) => {
    var current = new Date();

    // Tạo một mảng để lưu trữ lịch hẹn
    var schedule = [];

    // Lặp qua mỗi ngày trong khoảng thời gian
    for (var i = 0; i < 7; i++) {
        // Tạo đối tượng chứa thời gian cho mỗi ngày
        var currentDate = new Date(current);
        currentDate.setDate(currentDate.getDate() + i);
        currentDate.setHours(0, 0, 0, 0);

        const timeArr = [];
        var currentTime = start;
        while (currentTime < end) {
            const time = {
                startTime: formatTime(currentTime),
                endTime: formatTime(addMinutes(currentTime, durationPerAppointment))
            };
            timeArr.push(time);
            currentTime = addMinutes(currentTime, durationPerAppointment);
        }

        // Thêm đối tượng vào mảng
        schedule.push({ date: currentDate, times: timeArr });
    }

    return schedule;
};

// Hàm cộng thêm phút vào một thời gian đã cho

const addMinutes = (time, minutesToAdd) => {
    var date = new Date();
    date.setHours(parseInt(time), parseInt((time % 1) * 60)); // Thời gian trong giờ và phút
    date.setMinutes(date.getMinutes() + minutesToAdd); // Thêm số phút
    return date.getHours() + date.getMinutes() / 60; // Trả về thời gian dưới dạng số thập phân
};

// Hàm chuyển đổi thời gian thành chuỗi thời gian có định dạng "hh:mm"
const formatTime = (time) => {
    // Lấy phần nguyên của thời gian (giờ)
    const hours = Math.floor(time);
    // Lấy phần thập phân và chuyển đổi thành phút
    const minutes = Math.round((time % 1) * 60);
    // Trả về chuỗi thời gian có định dạng "hh:mm"
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};