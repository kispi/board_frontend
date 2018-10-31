module.exports = {
    server: {
        port: 3000,
        host: '0.0.0.0'
    },
    head: {
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'Meta description' }
        ],
        link: [
            { rel: 'stylesheet', href: "https://cdnjs.cloudflare.com/ajax/libs/material-design-iconic-font/2.2.0/css/material-design-iconic-font.min.css" }
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
    env: {
        baseUrl: process.env.BASE_URL || 'http://18.191.4.5:3000',
        apiUrl: 'http://18.191.4.5:4500/v1/'
    }
}