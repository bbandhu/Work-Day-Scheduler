/ Get the current date and display it in the planner header
var currentDate = moment().format("dddd, MMMM Do YYYY");
$("#currentDay").text(currentDate);

// Dynamically generate time blocks for standard business hours
for (var i = 9; i <= 17; i++) {
  var blockTime = moment().hour(i).format("hA");
  var blockHTML = "<div class='time-block' id='block-" + i + "'>" +
                    "<div class='hour'>" + blockTime + "</div>" +
                    "<textarea class='event'></textarea>" +
                    "<button class='save-button'>Save</button>" +
                  "</div>";
  $("#planner").append(blockHTML);
}

// Compare current time to time blocks and dynamically update color coding
function updateBlocks() {
  var currentHour = moment().hour();
  $(".time-block").each(function() {
    var blockHour = parseInt($(this).attr("id").split("-")[1]);
    if (blockHour < currentHour) {
      $(this).addClass("past");
    } else if (blockHour === currentHour) {
      $(this).removeClass("past");
      $(this).addClass("present");
    } else {
      $(this).removeClass("past");
      $(this).removeClass("present");
      $(this).addClass("future");
    }
  });
}

// Call updateBlocks function to initialize color coding and update every hour
updateBlocks();
setInterval(updateBlocks, 3600000);

// Load saved events from local storage
$(".event").each(function() {
  var blockID = $(this).parent().attr("id");
  var savedEvent = localStorage.getItem(blockID);
  if (savedEvent !== null) {
    $(this).val(savedEvent);
  }
});

// Save event text to local storage when save button is clicked
$(".save-button").on("click", function() {
  var blockID = $(this).parent().attr("id");
  var eventText = $(this).siblings(".event").val();
  localStorage.setItem(blockID, eventText);
});