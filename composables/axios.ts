import axios from "axios";

const position = useCookie("op:selected-job");
const token = useCookie("auth:token");

const nuxtApp = useNuxtApp();

export const useApi = () => {
  const baseURL = nuxtApp.$config.public.auth.baseURL;

  const instance = axios.create({
    baseURL,
    headers: {
      common: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token.value,
        "Selected-Position": position.value,
      },
    },
  });

  return instance;
};
