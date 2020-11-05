export function ubicacion() {
  return new Promise((resolver) => {
    const opciones = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    function success(pos) {
      const coords = pos.coords;

      resolver({
        lat: coords.latitude,
        lon: coords.longitude,
        certeza: coords.accuracy,
      });
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, opciones);
  });
}

export function infoDispositivo() {
  return navigator;
}
