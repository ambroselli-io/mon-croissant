mapboxgl.accessToken =
  "pk.eyJ1IjoiYXJuYXVkYW1icm8iLCJhIjoiY2p2dXQwYzcwMDVtMTN5bXI5ZjZ3Ynk5aCJ9.EzXZWG6BOMG3KTFBkYKx2Q";

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  center: [4.891332614225945, 52.373091430357476], // Dam square
  zoom: 15,
  // antialias: true,
  // cooperativeGestures: false,
  // doubleClickZoom: false,
});
const nav = new mapboxgl.NavigationControl({
  visualizePitch: true,
});
map.addControl(nav, "bottom-right");
export default map;
