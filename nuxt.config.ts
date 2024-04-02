import * as dotenv from "dotenv";
dotenv.config({
  path: `./env/main.${process.env.NODE_ENV}.env`,
  override: false,
});
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@sidebase/nuxt-auth",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@nuxtjs/i18n",
  ],

  plugins: ["~/plugins/plugins"],

  // TODO: add languages variables
  i18n: {
    vueI18n: "~/lang/i18n.config.ts", // if you are using custom path, default
  },

  // OPTIMIZE: change session data
  // TODO: remove signup form admin and get admin users & endpoints
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

      // TODO: Change data session form
      sessionDataType: {
        userInformations: "UserInformations",
        userPositions: "JobData[]",
      },

      token: {
        maxAgeInSeconds: 60 * 60 * 24,
      },
      // OPTIMIZE: Enable this if you want to use the refreshToken feature
      // @ts-ignore
      // refreshToken: {
      //   maxAgeInSeconds: 60 * 60 * 24,
      // },
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
});
