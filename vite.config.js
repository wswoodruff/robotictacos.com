// vite.config.js
import { viteStaticCopy as Copy } from 'vite-plugin-static-copy'

export default {
    plugins: [
        Copy({
            targets: [
                { src: './CNAME', dest: '.' },
                { src: './models', dest: '.' },
                { src: './videos', dest: '.' },
                { src: './svgs', dest: '.' },
                { src: './images', dest: '.' },
                { src: 'indextacos.html', dest: '.' },
            ]
        })
    ]
}
