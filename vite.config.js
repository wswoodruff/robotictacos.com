// vite.config.js
import { viteStaticCopy as Copy } from 'vite-plugin-static-copy'
import path from 'path';
import { svelte } from '@sveltejs/vite-plugin-svelte';

import { readdirSync } from 'fs';
import { resolve } from 'path';

export default {
    plugins: [
      svelte(),
      Copy({
          targets: [
              { src: './CNAME', dest: '.' },
              { src: './models', dest: '.' },
              { src: './videos', dest: '.' },
              { src: './svgs', dest: '.' },
              { src: './images', dest: '.' }
          ]
      })
    ],
    build: {
      rollupOptions: {
        // input: {
        //   main: './index.html',
        //   main222: './index222.html',
        //   main222fun: './index222fun.html',
        //   tacos: './indextacos.html',
        //   rock: './indexrock.html',
        //   dogskate: './index_dogskate.html',
        //   jellysealife: './index_jellysealife01.html'
        //   // ...
        //   // List all files you want in your build
        // }
        input: Object.fromEntries(
                readdirSync('./') // Read the root directory
                  .filter((file) => file.startsWith('index') && file.endsWith('.html')) // Filter files
                  .map((file) => [file.replace(/\.html$/, ''), resolve(__dirname, file)]) // Create key-value pairs
              )
      }
    },
    resolve : {
      alias: {
        '@builders': path.resolve(__dirname, './js/utils/builders/builders.js')
      },
    }
}
