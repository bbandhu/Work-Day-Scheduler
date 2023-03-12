// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
var save = $('.saveBtn');
var savedTime = $('#ScheduledTime');
$(document).ready(function(){
  save.on('click', function(){
        var value = $(this).siblings('.description').val();
        var time = $(this).parent().attr('id');
      localStorage.setItem(time, value);
      //display the time is saed to local storage
      savedTime.addClass('display');
   })

  // Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  function updateTime(){
    var currentTime = dayjs().hour();

  // loop over time blocks
  $('.time-block').each(function () {
    var blockedTime = parseInt($(this).attr('id').split('-')[1]);

    // check if we've moved past this time
    if (blockedTime < currentTime) {
      $(this).addClass('past');
    } else if (blockedTime === currentTime) {
      $(this).removeClass('past');
      $(this).addClass('present');
    } else {
      $(this).removeClass('past');
      $(this).removeClass('present');
      $(this).addClass('future');
    }
  });
  }

  updateTime();

  // Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  
// load any saved data from localStorage
$('#hour-9 .description').val(localStorage.getItem('hour-9'));
$('#hour-10 .description').val(localStorage.getItem('hour-10'));
$('#hour-11 .description').val(localStorage.getItem('hour-11'));
$('#hour-12 .description').val(localStorage.getItem('hour-12'));
$('#hour-13 .description').val(localStorage.getItem('hour-13'));
$('#hour-14 .description').val(localStorage.getItem('hour-14'));
$('#hour-15 .description').val(localStorage.getItem('hour-15'));
$('#hour-16 .description').val(localStorage.getItem('hour-16'));
$('#hour-17 .description').val(localStorage.getItem('hour-17'));

// Add code to display the current date in the header of the page.
// display current day on page
$('#currentDay').text(dayjs().format('dddd, MMMM D, YYYY'));

});
