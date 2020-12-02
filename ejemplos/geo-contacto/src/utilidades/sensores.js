import { MotionEventResult, Plugins } from '@capacitor/core';
const { Geolocation, Motion, Device } = Plugins;

export async function tomarFoto() {
  const camera = document.createElement('pwa-camera-modal');
  document.body.appendChild(camera);
  await camera.componentOnReady();

  return new Promise((resolver, rechazar) => {
    camera.addEventListener('noDeviceError', async (e) => {
      console.log('No se encontró una cámara para usar esta función', e);
    });

    camera.addEventListener('onPhoto', async (e) => {
      const photo = e.detail;

      if (photo && !(photo instanceof Error)) {
        const url = window.URL.createObjectURL(photo);
        resolver(url);
      } else if (photo) {
        rechazar(photo.message);
      }

      await camera.dismiss();
      document.body.removeChild(camera);
    });

    camera.present();
  });
}

export async function infoDispositivo() {
  try {
    const info = await Device.getInfo();
    const bateria = await Device.getBatteryInfo();
    const { value } = await Device.getLanguageCode();

    return { ...info, ...bateria, ...{ lang: value } };
  } catch (err) {
    console.error(err);
  }
}

export async function movimiento() {
  try {
    await DeviceMotionEvent.requestPermission();
  } catch (err) {
    throw new Error(err);
  }

  Motion.addListener('accel', (evento) => {
    console.log(evento);
    const aceleracion = evento.acceleration;
    const aceleracionConGravedad = evento.accelerationIncludingGravity;
    const rotacion = evento.rotationRate;
    const intervalo = evento.interval;
  });
}

//
const shakeThreshold = 25;

let sensor = new LinearAccelerationSensor({ frequency: 60 });

sensor.addEventListener('reading', () => {
  if (sensor.x > shakeThreshold) {
    console.log('Shake detected.');
  }
});

sensor.start();
