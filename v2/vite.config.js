import { defineConfig } from 'vite'

import { viteStaticCopy } from 'vite-plugin-static-copy'


// https://vitejs.dev/config/
export default defineConfig({
  
  base: '/robotictacos.com/',

  plugins: [
    viteStaticCopy({
      targets: [
        { src: './CNAME', dest: '.' },
        { src: './videos', dest: '.' }
      ]
    })
  ],
  
  build:{

    outDir: './build',  // Change to 'build' if needed
    emptyOutDir: true, // also necessary
  }

})