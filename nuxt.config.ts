import * as dotenv from "dotenv";
dotenv.config({
  path: `./.env.${process.env.NODE_ENV}.local`,
  override: false,
});
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "FEZtool - Free and Easy",
      titleTemplate: "%s - FEZtool",
    },
  },

  modules: [
    "@sidebase/nuxt-auth",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@nuxtjs/i18n",
    "unplugin-icons/nuxt",
    "@nuxtjs/google-fonts",
  ],

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
          path: "/admin/auth/token",
          method: "post",
        },
        getSession: {
          path: "/admin/auth/session",
          method: "get",
        },
        signOut: {
          path: "/auth/logout",
          method: "get",
        },
      },

      token: {
        maxAgeInSeconds: 60 * 60 * 24,
      },
    },
    globalAppMiddleware: {
      isEnabled: true,
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
