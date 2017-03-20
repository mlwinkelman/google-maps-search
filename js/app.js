// Constructor that creates class called "mapMarker" (global)
var mapMarker = function(){
};

// Document ready
$(function(){
		window.mapMarker1 = new mapMarker();
		window.mapMarker1.init();
});

mapMarker.prototype.init = function(){
	this._bindEvents();
	this._default(39.7439, -105.0201);
};

mapMarker.prototype._bindEvents = function(){
	$('#submit-zipcode').on('click', $.proxy(this._getData, this));
	// if return/enter is clicked, this fires the button click above
	$('#meetup-by-zipcode').keyup(function(event){
		if(event.keyCode == 13){
			$('#submit-zipcode').click();
		}
  });
};

mapMarker.prototype._getData = function(){
	var myZip = $("#meetup-by-zipcode").val();
	this._addMarker(myZip);
};

mapMarker.prototype._default = function(p1, p2){
	this.initMap(p1, p2);
};

mapMarker.prototype._addMarker = function(param){
  // clears the field after the zipcode is entered and button is clicked
  $('input[type="text"]').val('');

  var _self = this;
	$.ajax({
       url: "https://api.meetup.com/2/cities",
       type: "GET",
       data: {
           query: param
       },
       dataType: "jsonp",
			 success: function(data){
				 _self.initMap(data.results[0].lat, data.results[0].lon)
			 }
   }).fail(function() {
       console.log("failed");
   }).always(function() {
       console.log("complete");
   });
};

mapMarker.prototype.initMap = function(param1, param2){
 // initMap() {
  var target = {lat: param1, lng: param2};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 11,
    center: target
  });
  var marker = new google.maps.Marker({
    position: target,
    map: map
  });
}
