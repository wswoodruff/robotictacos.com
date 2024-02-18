import { viteStaticCopy } from 'vite-plugin-static-copy';

export default {
    plugins: [
        viteStaticCopy({
            targets: [
                { src: 'images', dest: '.' },
                { src: 'models', dest: '.' },
                { src: 'svgs', dest: '.' },
                { src: 'videos', dest: '.' },
                { src: 'CNAME', dest: '.' }
            ]
        })
    ]
}
