import map from "./map.js";

function getShopName(message) {
  return new Promise(function (resolve, reject) {
    let result = window.prompt(message);

    return resolve(result);
  });
}

// map.on("mouseup", async (event) => {
//   console.log(event.lngLat); // { lat: lng: }
//   const name = await getShopName("Nom du magasin");
//   if (!name) return;
//   fetch(`${API_URL}/shop`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//     },
//     body: JSON.stringify({
//       coordinates: [event.lngLat.lng, event.lngLat.lat],
//       name,
//     }),
//   })
//     .then((res) => res.json())
//     .then(console.log)
//     .catch(console.log);
// });
