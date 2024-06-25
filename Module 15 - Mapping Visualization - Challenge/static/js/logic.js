// Initialize the map
var map = L.map('map').setView([37.7749, -122.4194], 5); // Centered on San Francisco with zoom level 5

// Add a tile layer to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Fetch the GeoJSON data
fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson')
  .then(response => response.json())
  .then(data => {
    // Function to determine the marker size based on magnitude
    function markerSize(magnitude) {
      return magnitude * 3;
    }

    // Function to determine the marker color based on depth
    function markerColor(depth) {
      return depth > 90 ? '#800026' :
             depth > 70 ? '#BD0026' :
             depth > 50 ? '#E31A1C' :
             depth > 30 ? '#FC4E2A' :
             depth > 10 ? '#FD8D3C' :
                          '#FEB24C';
    }

    // Add GeoJSON layer to the map
    L.geoJSON(data, {
      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, {
          radius: markerSize(feature.properties.mag),
          fillColor: markerColor(feature.geometry.coordinates[2]),
          color: 'black',
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8
        });
      },
      onEachFeature: function (feature, layer) {
        layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>Magnitude: ${feature.properties.mag}</p><p>Depth: ${feature.geometry.coordinates[2]} km</p><p>${new Date(feature.properties.time)}</p>`);
      }
    }).addTo(map);

    // Add a legend to the map
    var legend = L.control({position: 'bottomright'});

    legend.onAdd = function (map) {
      var div = L.DomUtil.create('div', 'info legend'),
          depths = [0, 10, 30, 50, 70, 90],
          labels = [];

      div.innerHTML += '<strong>Depth (km)</strong><br>';
      // Loop through our density intervals and generate a label with a colored square for each interval
      for (var i = 0; i < depths.length; i++) {
        div.innerHTML +=
            '<i style="background:' + markerColor(depths[i] + 1) + '"></i> ' +
            depths[i] + (depths[i + 1] ? '&ndash;' + depths[i + 1] + '<br>' : '+');
      }

      return div;
    };

    legend.addTo(map);
  })
  .catch(error => console.log('Error fetching the GeoJSON data: ', error));
