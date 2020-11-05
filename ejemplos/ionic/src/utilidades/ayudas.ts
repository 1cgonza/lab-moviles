import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
const { Camera, Device } = Plugins;

export async function tomarFoto() {
  try {
    const foto = await Camera.getPhoto({
      quality: 100,
      allowEditing: true,
      source: CameraSource.Camera,
      resultType: CameraResultType.Uri
    });

    return foto.webPath;
  } catch (err) {
    console.log('¿Porqué te arrepentiste de tomar una foto?');
  }
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
