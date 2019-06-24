import pkg from './package'

export default {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: '趣教育',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'msapplication-tap-highlight', content: 'no' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
    ],
    link: [
      { rel: 'SHORTCUT ICON', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: 'https://easytuan.gitee.io/node-elm-api/public/flexible.js' },
    ],
    htmlAttrs: {
      style:'font-size:12px'
    },
    bodyAttrs:{
      style:'font-size:12px'
    }
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },
  // cache: true,


  /*
  ** Global CSS
  */
  css: [
    // 'normalize.css',
    'font-awesome/css/font-awesome.min.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~plugins/mint-ui' },
    { src: '~assets/styles/base.scss' },
    { src: '~plugins/vue2-hammer',ssr:false },
    { src: '~plugins/filter'},
    { src: '~plugins/vue-concise-slider', ssr: false },
    { src: '~plugins/vant'},
    { src: '~plugins/echarts'},
    { src: '~plugins/route', ssr: false},
    { src: '~plugins/wechat',ssr:false},
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
  ],

  proxy:{
    '/api': {
      target: 'http://localhost:8911',
      pathRewrite: {
        '^/api' : '/'
      }
    }
  },

  /*
  ** Build configuration
  */
  build: {
    vendor: ['axios', 'mint-ui', 'js-cookie','vue2-hammer','vant'],
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          // loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
}
