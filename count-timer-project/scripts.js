/**
 * select specific date and count down [day , hour , minute] to this date
 */
const newYear = '1 jan 2022';  // Format [month/day/year]
countDownFun();
const countDownInterval = setInterval(countDownFun, 1000);

function countDownFun() {
    const currentDate = new Date();
    const newYearDate = new Date(newYear);
    const totalSeconds = (newYearDate - currentDate)/1000;  //millsecond so we divide it by 1000 to get total seconds

    const remainSeconds = Math.floor(totalSeconds)%60;
    const remainMins = Math.floor(totalSeconds/60)%60;
    const remainHours = Math.floor(totalSeconds/3600)%24;
    const remainDays =  Math.floor(totalSeconds/3600/24);

    document.getElementById('days').innerHTML = remainDays;
    document.getElementById('hours').innerHTML = formatTime(remainHours);
    document.getElementById('minutes').innerHTML = formatTime(remainMins);
    document.getElementById('seconds').innerHTML = formatTime(remainSeconds);
}
function formatTime(time){
    return time<10?`0${time}`:time;
}