const root = document.getElementById('root');

if (navigator.geolocation) {
  navigator.geolocation.watchPosition(success, error);
}

function success(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  root.textContent = `Latitude: ${latitude}, Longitude: ${longitude}`;
}

function error() {
  root.textContent = 'nope';
}
