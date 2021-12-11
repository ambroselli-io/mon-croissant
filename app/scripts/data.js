import map from "./map.js";

const getData = async () => {
  map.addSource("shops", {
    type: "geojson",
    data: `${API_URL}/shop?geojson=true`,
  });
  map.addLayer({
    id: "shops",
    type: "symbol",
    source: "shops",
    layout: {
      "icon-image": "croissant",
      "icon-allow-overlap": true,
      "icon-ignore-placement": true,
      "icon-size": 0.3,
      "icon-offset": [0, -75],
    },
  });
  let img = new Image(150, 150);
  img.onload = () => map.addImage("croissant", img);
  img.src = "./assets/marker.svg";

  // When a click event occurs on a feature in the shops layer, open a popup at the
  // location of the feature, with description HTML from its properties.
  map.on("click", "shops", (e) => {
    // Copy coordinates array.
    const coordinates = e.features[0].geometry.coordinates.slice();
    const description = e.features[0].properties.title;

    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    const markerHeight = 50;
    const markerRadius = 10;
    const linearOffset = 25;
    const popupOffsets = {
      top: [0, 0],
      "top-left": [0, 0],
      "top-right": [0, 0],
      bottom: [0, -markerHeight],
      "bottom-left": [linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
      "bottom-right": [-linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
      left: [markerRadius, (markerHeight - markerRadius) * -1],
      right: [-markerRadius, (markerHeight - markerRadius) * -1],
    };

    new mapboxgl.Popup({ offset: popupOffsets })
      .setLngLat(coordinates)
      .setHTML(description)
      .addTo(map);
  });

  // Change the cursor to a pointer when the mouse is over the shops layer.
  map.on("mouseenter", "shops", () => {
    map.getCanvas().style.cursor = "pointer";
  });

  // Change it back to a pointer when it leaves.
  map.on("mouseleave", "shops", () => {
    map.getCanvas().style.cursor = "";
  });
};

map.on("load", getData);
