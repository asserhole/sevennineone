import pkg from './package';
const rem = '!function(e){var t,n=document,i=window,o=n.documentElement;function u(){var t=o.getBoundingClientRect().width/e*100;o.style.fontSize=t+"px"}u(),i.addEventListener("resize",function(){clearTimeout(t),t=setTimeout(u,300)},!1),i.addEventListener("pageshow",function(e){e.persisted&&(clearTimeout(t),t=setTimeout(u,300))},!1)}(750);';


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
      { innerHTML: rem, type: 'text/javascript', charset: 'utf-8' }
    ],
    htmlAttrs: {
      style:'font-size:12px'
    },
    bodyAttrs:{
      style:'font-size:12px'
    },
    __dangerouslyDisableSanitizers: ['script']
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
      target: 'http://www.djtp.com/api',
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
