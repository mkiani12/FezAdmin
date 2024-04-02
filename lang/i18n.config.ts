import en from "./en.js";
import fa from "./fa.js";
export default defineI18nConfig(() => ({
  legacy: false,
  locale: "en",
  messages: {
    en,
    fa,
  },
}));
