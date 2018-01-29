// Api urls call 
var apiUrl = function(data) {
  this.channels = "https://wind-bow.glitch.me/twitch-api/channels/" + data;
  this.streams = "https://wind-bow.glitch.me/twitch-api/streams/" + data;
}; 

// create a new channel
function channel(data) {
  var create = new apiUrl(data);
  return create;
}

// list Array to add channels
var list = [
  channel("freeCodeCamp"), 
  channel("ESL_SC2"), 
  channel("trumpsc"), 
  channel("BowskiJ"), 
	channel("BeyondTheSummit"), 
	channel("RobotCaleb"), 
  channel("noobs2ninjas"),
	channel("brunofin")
];

//declare rows
var $row = $(".row");

//add users data to rows
$.each($row, function(i, val){
	$.getJSON(list[i].channels, function(data){
		// verify if user exist if not display error message
		if (data.error === "Not Found") {
			$(val).append('<div class="col-2 logo"><i class="fa fa-times fa-4x" aria-hidden="true"></i></div><div class="col-10 mt-2 name errormessage"><p></p></div><div class="col-6 stream"><p>' + data.message + '</p></div></div>');
		} 
		else 
		{
			$(val).append("<div class='col-2 logo'><img src=" + data.logo + "></div>");
			$(val).append('<div class="col-4 name"><p><a href=' + data.url + ' target="_blank">' + data.display_name + '</p></div>');
			$.getJSON(list[i].streams, function(data){
				if (data.stream === null) {
					$(val).append('<div class="col-6 stream online"><p>OFFLINE</p></div>');
				} else {
					$(val).append('<div class="col-6 stream "><p><a href=' + data.stream.channel.url + ' target="_blank">ONLINE</a></p><small>' + data.stream.channel.status + '</div>');
				}
			});
		}
	});
});

// all, on and off click functions
$("#on").on("click", function(){
	$(".row").removeClass("hide");
	$.each($row, function(i, val){
		console.log($(".stream p")[i].innerText);
		if ($(".stream p")[i].innerText !== "ONLINE") {
			$(val).addClass("hide");
		}
	});
});

$("#off").on("click", function(){
	$(".row").removeClass("hide");
	$.each($row, function(i, val){
		console.log($(".stream p")[i].innerText);
		if ($(".stream p")[i].innerText !== "OFFLINE") {
			$(val).addClass("hide");
		}
	});
});

$("#all").on("click", function(){
	$row.removeClass("hide");
});