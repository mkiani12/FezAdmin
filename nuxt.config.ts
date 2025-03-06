import * as dotenv from "dotenv";
dotenv.config({
  path: `./.env.${process.env.NODE_ENV}.local`,
  override: false,
});
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@sidebase/nuxt-auth",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@nuxtjs/i18n",
    "unplugin-icons/nuxt",
    "@nuxtjs/google-fonts",
  ],
  // todo: change icons 

  plugins: ["~/plugins/plugins"],

  i18n: {
    vueI18n: "~/lang/i18n.config.ts", // if you are using custom path, default
  },

  googleFonts: {
    families: {
      Outfit: true, // Defaults to all weights/styles
    },
    display: "swap",
  },

  auth: {
    baseURL: process.env.BASE_URL,
    provider: {
      type: "local",
      pages: {
        login: "/auth/login",
      },
      endpoints: {
        signIn: {
          path: "/auth/login",
          method: "post",
        },
        signUp: {
          path: "/auth/signup",
          method: "post",
        },
        getSession: {
          path: "/auth/session",
          method: "get",
        },
      },

      token: {
        maxAgeInSeconds: 60 * 60 * 24,
      },
 
    },
    globalAppMiddleware: {
      isEnabled: false,
    },
  },

  ssr: false,

  typescript: {
    shim: false,
  },

  build: {
    transpile: ["vuetify"],
  },

  vite: {
    define: {
      "process.env.DEBUG": false,
    },
  },

  nitro: {
    serveStatic: true,
  },

  devServer: {
    port: parseInt(process.env.PORT ?? "3000"),
  },

  devServerHandlers: [],
  hooks: {},
  compatibilityDate: "2025-03-06",
});