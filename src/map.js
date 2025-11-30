let map, marker;

export function initMap() {
  map = L.map('map', { center: [20.5937, 78.9629], zoom: 5 }); 
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
  }).addTo(map);
}

export function setUserLocation(lat, lng) {
  if (!map) initMap();
  map.setView([lat, lng], 15);
  if (marker) marker.remove();
  marker = L.marker([lat, lng]).addTo(map).bindPopup("You are here").openPopup();
}
