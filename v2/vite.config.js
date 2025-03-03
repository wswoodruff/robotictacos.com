import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte';

import { viteStaticCopy } from 'vite-plugin-static-copy'
import path from 'path';
import fs from 'fs';

import { readdirSync } from 'fs';


// import dotenv from 'dotenv';

// dotenv.config(); // Load .env variables



// this removes the need to run viteStaticCopy
// but its also super important cause the aliases dont work without it
// // however its stuck to only one folder for now
// const gamesDir = path.resolve(__dirname, 'games/boxgame1');
// const gameHtmlFiles = fs.readdirSync(gamesDir)
//   .filter(file => file.endsWith('.html'))
//   .reduce((acc, file) => {
//     const name = file === 'index.html' ? 'games' : `games/${path.parse(file).name}`;
//     acc[name] = path.join(gamesDir, file);
//     return acc;
//   }, {});

const gamesDir = path.resolve(__dirname, 'games');

const gameDirs = fs.readdirSync(gamesDir)
  .filter(file => fs.statSync(path.join(gamesDir, file)).isDirectory());

const gameHtmlFiles = gameDirs.reduce((acc, dir) => {
  const dirPath = path.join(gamesDir, dir);
  const htmlFiles = fs.readdirSync(dirPath)
    .filter(file => file.endsWith('.html'))
    .reduce((dirAcc, file) => {
      const name = file === 'index.html' ? `${dir}/games` : `${dir}/games/${path.parse(file).name}`;
      dirAcc[name] = path.join(dirPath, file);
      return dirAcc;
    }, {});

  return { ...acc, ...htmlFiles };
}, {});


//// const gameHtmlFiles = fs.readdirSync(gamesDir)
////   .filter(file => file.endsWith('.html'))
////   .reduce((acc, file) => {
////     acc[`games${file === 'index.html' ? '' : path.parse(file).name}`] = path.join(gamesDir, file);
////     return acc;
////   }, {});

// https://vitejs.dev/config/
export default defineConfig({
  
  // base breaks linking now for new gh-ps???
  // base: '/robotictacos.com/',
  // base: '/robotictacos.com',
  // base: '/fish',
  // base: './',

  define: {
    SUPERNEATLIB_PATH: JSON.stringify(process.env.VITE_SUPERNEATLIB_PATH)
  },

  plugins: [
    svelte(),
    viteStaticCopy({
      targets: [
        { src: './CNAME', dest: '.' },
        // { src: './videos', dest: '.' }
        // { src: './games', dest: '.' } // Copies entire games folder, including assets
        // { src: './games', dest: '.' } // Copies entire games folder, including assets

      ]
    })
  ],

  resolve: {
    alias: {
      'three': '/node_modules/three/build/three.module.js',
            // three: path.resolve('node_modules/three/build/three.module.js'),

      // three: `./node_modules/three/build/three.module.js`,
      'superneatlib': '/node_modules/superneatlib/build/superneatlib.js',
      // 'superneatlib': 'http://localhost:5000/superneatlib.js',
      // 'three': 'three',
      '/three/examples/jsm/math/' : '/node_modules/three/examples/jsm/math/',
      '@games': '/games',
      '@promotetosuper': '/games/promotetosuper',
      '@models_shared': '/games/models_shared'
    },
  },

  build:{

    outDir: './build',  // gh-pages needs to to be called build now?!
    emptyOutDir: true, // also necessary

    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        ...gameHtmlFiles
      },
    },

  }

})



