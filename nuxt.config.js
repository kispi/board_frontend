module.exports = {
    css: [
        { src: '@/assets/styles/index.less', lang: 'less' },
    ],
    plugins: [
        '@/plugins/global',
        '@/plugins/translate',
        '@/plugins/validator',
        '@/filters/index',
    ],
}