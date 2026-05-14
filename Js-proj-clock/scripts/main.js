function updateClock() {
  const now = new Date();

  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  const ampm = hours >= 12 ? "PM" : "AM";
  // hours >= ? "PM": "AM";

  console.log(hours); // 2 % 12 = 11

  hours = hours % 12;
  hours = hours ? hours : "12";

  if (hours < 10) {
    hours = "0" + hours;
  }

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  const timeString = hours + ":" + minutes + ":" + seconds + " " + ampm;
  document.getElementById("current-time").innerHTML = timeString
  
}

setInterval(updateClock, 1000)

updateClock();
