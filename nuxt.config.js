import prod from './config/prod.env'
import dev from './config/dev.env'

const config = {
    server: {
        port: 3000,
        host: '0.0.0.0'
    },
    router: {
        scrollBehavior() {
            return { x: 0, y: 0 }
        },
    },
    head: {
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'Meta description' }
        ],
        link: [
            { rel: 'stylesheet', href: "https://cdnjs.cloudflare.com/ajax/libs/material-design-iconic-font/2.2.0/css/material-design-iconic-font.min.css" }
        ],
        script: [
            { type: 'text/javascript', src: "//ip.fatc.club" }
        ]
    },
    css: [
        { src: '@/assets/styles/index.less', lang: 'less' },
    ],
    plugins: [
        '@/plugins/axios',
        '@/plugins/global',
        '@/plugins/moment',
        '@/plugins/translate',
        '@/plugins/validator',
        '@/filters/index',
        '@/directives/index'
    ],
    dev: (process.env.NODE_ENV !== 'production'),
    env: prod
}

if (config.dev) {
    config.env = dev;
}

export default config