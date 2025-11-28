// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-11-07',
  devtools: { enabled: true },

  ssr: true,

  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE_URL, // client + server
      mediaUrl: process.env.MEDIA_BASE_URL,
    }
  },

  app: {
    head: {
      titleTemplate: '%s | Booking App',
      meta: [
        { name: 'description', content: 'Trang web đặt chỗ trực tuyến nhanh chóng, dễ sử dụng, tối ưu SEO.' },
        { name: 'keywords', content: 'booking, đặt phòng, du lịch, khách sạn, nhà nghỉ, tour, resort' },
        { property: 'og:title', content: 'Booking App - Đặt chỗ nhanh, trải nghiệm tốt' },
        { property: 'og:description', content: 'Website booking hiện đại, thân thiện với SEO và người dùng' },
        { property: 'og:type', content: 'website' },
        { name: 'robots', content: 'index, follow' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },

  // eslint: {
  //   lintOnStart: false,
  // },

  // content: {
  //   // nếu sau này bạn có bài blog hoặc bài giới thiệu SEO
  //   documentDriven: false,
  // },

  image: {
    // tối ưu hình ảnh tự động
    format: ['webp', 'avif'],
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/ui',
    'shadcn-nuxt',
    '@nuxt/fonts'
  ],

  css: ['~/assets/css/tailwind.css', '~/assets/css/reverse-format.css', '@fortawesome/fontawesome-svg-core/styles.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  },

  fonts: {
    families: [
      { name: 'Roboto', provider: 'google' }
    ]
  },

  typescript: {
    strict: true,
    typeCheck: false
  },

  routeRules: {
    '/admin/**': { ssr: false },
  },

  nitro: {
    preset: "node-server"
  }
})