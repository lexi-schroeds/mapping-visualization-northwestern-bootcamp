// Creating the map object
let myMap = L.map("map", {
  center: [40.7, -73.95],
  zoom: 11
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// To do:

// Store the API query variables.
// For docs, refer to https://dev.socrata.com/docs/queries/where.html.
// And, refer to https://dev.socrata.com/foundry/data.cityofnewyork.us/erm2-nwe9.
let baseURL = "https://data.cityofnewyork.us/resource/fhrw-4uyv.json?";
// Add the dates in the ISO formats
let date = "$where=created_date between '' and ''";
// Add the complaint type.
let complaint = "&complaint_type=";
// Add a limit.
let limit = "&$limit=";

// Assemble the API query URL.
let url = baseURL + date + complaint + limit;

// Get the data with d3.

  // Create a new marker cluster group.

  // Loop through the data.

    // Set the data location property to a variable.

    // Check for the location property.

      // Add a new marker to the cluster group, and bind a popup.

  // Add our marker cluster layer to the map.
