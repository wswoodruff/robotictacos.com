// vite.config.js
import { viteStaticCopy as Copy } from 'vite-plugin-static-copy'
import path from 'path';

export default {
    plugins: [
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
        input: {
          main: './index.html',
          main222: './index222.html',
          tacos: './indextacos.html',
          rock: './indexrock.html',
          dogskate: './index_dogskate.html',
          jellysealife: './index_jellysealife01.html'
          // ...
          // List all files you want in your build
        }
      }
    },
    resolve : {
      alias: {
        '@builders': path.resolve(__dirname, './js/utils/builders/builders.js')
      },
    }
}
