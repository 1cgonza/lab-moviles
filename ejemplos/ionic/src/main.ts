import { createApp } from 'vue';
import App from './App.vue';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import './css/estilos.css';

createApp(App).mount('#app');
defineCustomElements(window);
