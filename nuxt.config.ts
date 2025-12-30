// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-11-07",
  devtools: { enabled: true },

  ssr: true,

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_API_BASE_URL, // client + server
      mediaUrl: process.env.NUXT_MEDIA_BASE_URL,
      tinymceKey: process.env.NUXT_TINYMCE_API_KEY,
      siteUrl: process.env.NUXT_SITE_URL,
    },
  },

  app: {
    head: {
      titleTemplate: "%s | DyHome",
      meta: [
        {
          name: "description",
          content:
            "Đặt homestay, căn hộ, khách sạn nhanh chóng tại Ocean Park & Hà Nội, khu vực Miền Bắc, Miền Nam, Miền Trung. Giá tốt, vị trí đẹp, tiện ích đầy đủ, hỗ trợ 24/7.",
        },
        {
          name: "keywords",
          content:
            "booking, đặt phòng, du lịch, khách sạn, nhà nghỉ, tour, resort, đặt homestay, homestay ocean park, đặt phòng hà nội, căn hộ cho thuê, khách sạn giá tốt",
        },
        {
          property: "og:title",
          content: "DyHome - Đặt chỗ nhanh, trải nghiệm tốt",
        },
        {
          property: "og:description",
          content:
            "DyHome – Nền tảng booking homestay, khách sạn tiện lợi, đặt chỗ nhanh, giao diện thân thiện",
        },
        { property: "og:type", content: "website" },
        { name: "robots", content: "index, follow" },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png",
        },
      ],
      htmlAttrs: {
        lang: "vi",
      },
    },
  },

  // eslint: {
  //   lintOnStart: false,
  // },

  image: {
    // tối ưu hình ảnh tự động
    format: ["webp", "avif"],
  },

  modules: [
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxt/ui",
    "shadcn-nuxt",
    "@nuxt/fonts",
    "@vee-validate/nuxt",
    "@nuxtjs/sitemap",
  ],

  site: {
    url: "https://dyhome.vn", // domain chính
  },

  sitemap: {
    exclude: [
      "/admin/**",
      "/login",
      "/register",
      "/forgot-password",
      "/cam-on",
      "/xac-nhan",
      "/dia-diem",
    ],
    sources: ["/api/__sitemap__/urls"],
  },

  veeValidate: {
    // disable or enable auto imports
    autoImports: true,
    // Use different names for components
    componentNames: {
      Form: "VeeForm",
      Field: "VeeField",
      FieldArray: "VeeFieldArray",
      ErrorMessage: "VeeErrorMessage",
    },
  },

  css: [
    "~/assets/css/tailwind.css",
    "~/assets/css/reverse-format.css",
    "@fortawesome/fontawesome-svg-core/styles.css",
  ],
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssCodeSplit: true,
    },
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },

  fonts: {
    families: [{ name: "Roboto", provider: "google" }],
  },

  typescript: {
    strict: true,
    typeCheck: false,
  },

  routeRules: {
    "/admin/**": { ssr: false },
    "/cam-nang/**": { ssr: true },
    "/dich-vu/**": { ssr: false },
    "/dia-diem/**": { ssr: false },
    "/gioi-thieu/**": { ssr: false },
    "/tim-kiem/**": { ssr: false },
  },

  image: {
    domains: [process.env.NUXT_API_SUBDOMAIN || ""],
  },
});
