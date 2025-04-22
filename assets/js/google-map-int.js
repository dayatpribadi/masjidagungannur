
function initMap() {
  var latlng = new google.maps.LatLng(-3.2562811349044765, 104.65065328561329);
  var myOptions = {
    zoom: 12,
    center: latlng
  };
  var map = new google.maps.Map(document.getElementById("contact-map"), myOptions);
  var myMarker = new google.maps.Marker({
    position: latlng,
    map: map,
    title:"Tanjung Senai"
  });

}