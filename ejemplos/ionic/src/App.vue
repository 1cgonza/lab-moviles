<template>
  <main>
    <button ref="tomarFotoBtn" @click="iniciarCamara">Tomar Foto</button>

    <img id="foto" v-if="fotoUrl" :src="fotoUrl" />

    <div v-if="info">
      <p>Empresa: {{ info.manufacturer }}</p>
      <p>Modelo: {{ info.model }}</p>
      <p>Sistema Operativo: {{ info.operatingSystem }}</p>
      <p>Versión: {{ info.osVersion }}</p>
      <p>Nivel Batería: {{ info.batteryLevel }}</p>
      <p>¿Cargando batería?: {{ info.isCharging }}</p>
      <p>Idioma: {{ info.lang }}</p>
    </div>
  </main>
</template>

<script>
import { tomarFoto, infoDispositivo } from './utilidades/ayudas';

export default {
  data() {
    return {
      fotoUrl: null,
      info: null,
    };
  },

  methods: {
    async iniciarCamara() {
      this.fotoUrl = await tomarFoto();
    },
  },

  async mounted() {
    this.info = await infoDispositivo();
  },
};
</script>
