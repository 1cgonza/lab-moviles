import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
// import { babel } from '@rollup/plugin-babel';
import browserSync from 'rollup-plugin-browsersync';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import postcss from 'rollup-plugin-postcss';
import url from '@rollup/plugin-url';
import autoprefixer from 'autoprefixer';
import path from 'path';
import copy from 'rollup-plugin-copy';

const produccion = !process.env.ROLLUP_WATCH;

const entradas = ['inicio', 'espacio-limite', 'expectations-failed', 'juego-de-papel', 's-contigo-y'];

const configuraciones = entradas.map((nombre, i) => {
  return {
    input: i === 0 ? `src/programa.js` : `proyectos/${nombre}/programa.js`,
    output: {
      file: i === 0 ? 'docs/programa.js' : `docs/${nombre}/programa.js`,
      // dir: i === 0 ? 'docs' : `docs/${nombre}`,
      format: 'iife',
      sourcemap: true,
    },
    plugins: [
      nodePolyfills(),
      resolve(), // Permite usar módulos de NPM
      commonjs(), // Convierte estos módulos a CommonJS para que se puedan usar
      // html({ files: i === 0 ? 'src/index.html' : `proyectos/${nombre}/index.html` }),
      postcss({
        extract: i === 0 ? path.resolve('docs', 'estilos.css') : path.resolve('docs', nombre, 'estilos.css'),
        minimize: produccion,
        sourceMap: !produccion,
        plugins: [
          autoprefixer({
            env: produccion ? 'production' : 'development',
          }),
        ],
      }),
      url(),
      copy({
        targets: [
          { src: 'src/imgs/**/*', dest: 'docs/imgs' },
          {
            src: 'proyectos/espacio-limite/imgs/icono.ico',
            dest: 'docs/espacio-limite',
          },
          {
            src: 'proyectos/espacio-limite/imgs/personaje-intro.png',
            dest: 'docs/espacio-limite',
          },
          {
            src: i === 0 ? 'src/index.html' : `proyectos/${nombre}/index.html`,
            dest: i === 0 ? 'docs' : `docs/${nombre}`,
          },
        ],
      }),
      produccion && terser(),
      !produccion &&
        browserSync({
          host: 'localhost',
          watch: true,
          port: 8080,
          notify: false,
          open: false,
          server: 'docs',
          files: ['src/**/*.*'],
        }),
    ],
  };
});

export default configuraciones;
