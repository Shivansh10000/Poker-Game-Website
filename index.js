let creditsval = localStorage.getItem("localcreds1");

let time;
function showtime() {
    time = new Date();
    console.log(time);
    document.getElementById('clock').innerHTML = time;
  }
  setInterval(showtime, 1000);

  showtime();
document.getElementById("credits").innerHTML = creditsval;