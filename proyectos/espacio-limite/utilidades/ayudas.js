export function debounce(cb, delay = 200) {
  let tiempo = null;

  return (...args) => {
    const siguiente = () => {
      cb(...args);
      clearTimeout(tiempo);
      tiempo = setTimeout(siguiente, delay);
    };
  };
}

export function distanciaEntreCoords(lat1, lon1, lat2, lon2) {
  const R = 6378.137; // Radio de la tierra en KM
  const dLat = ((lat2 - lat1) * Math.PI) / 180; // Grados a radians
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    0.5 -
    Math.cos(dLat) / 2 +
    (Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * (1 - Math.cos(dLon))) / 2;

  return R * 2 * Math.asin(Math.sqrt(a)); // en kilometros
}

// Sacado de https://www.w3.org/TR/motion-sensors/
// limpia un poco la señal de un sensor como el accelerometro
export class LowPassFilterData {
  constructor(reading, bias) {
    Object.assign(this, { x: reading.x, y: reading.y, z: reading.z });
    this.bias = bias;
  }

  update(reading) {
    this.x = this.x * this.bias + reading.x * (1 - this.bias);
    this.y = this.y * this.bias + reading.y * (1 - this.bias);
    this.z = this.z * this.bias + reading.z * (1 - this.bias);
  }
}

export function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function activarOrientacion(eventoOrientacion) {
  // esto es necesario para ios 13+
  if (window.DeviceOrientationEvent && typeof DeviceOrientationEvent.requestPermission === 'function') {
    DeviceOrientationEvent.requestPermission()
      .then((permissionState) => {
        if (permissionState === 'granted') {
          window.addEventListener('deviceorientation', eventoOrientacion, false);
        }
      })
      .catch(console.error);
  } else {
    window.addEventListener('deviceorientation', eventoOrientacion, false);
  }
}
