
    document.getElementById("reservationForm").addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Reservation submitted successfully!");
    });

    // for map view 
//      function initMap() {
//     const restaurantLocation = { lat: 37.4221, lng: -122.0841 }; // Change to your location

//     const map = new google.maps.Map(document.getElementById("customMap"), {
//       zoom: 15,
//       center: restaurantLocation,
//       styles: [ // Optional dark theme
//         {
//           "elementType": "geometry",
//           "stylers": [{ "color": "#ebe3cd" }]
//         },
//         {
//           "elementType": "labels.text.fill",
//           "stylers": [{ "color": "#523735" }]
//         },
//         {
//           "elementType": "labels.text.stroke",
//           "stylers": [{ "color": "#f5f1e6" }]
//         },
//         {
//           "featureType": "water",
//           "stylers": [{ "color": "#c9c9c9" }]
//         }
//       ]
//     });

//     const marker = new google.maps.Marker({
//       position: restaurantLocation,
//       map: map,
//       title: "Delicious Bistro",
//       icon: {
//         url: "your-logo.png",  // 🔁 Replace with your logo URL or local image path
//         scaledSize: new google.maps.Size(50, 50), // Adjust size as needed
//       }
//     });
//   }





// <!--<script async defer
//   src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap">
// </script>-->



