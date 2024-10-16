import axios from "axios";
import { proxy } from "./constUtils.js";

const instance = axios.create({
  baseURL: proxy,
});
instance.interceptors.request.use(function (config) {
  config.headers["Authorization"] = JSON.parse(
    localStorage.getItem("user")
  )?.token;
  return config;
});

instance.interceptors.response.use(
  function (resp) {
    return resp;
  },
  function (err) {
    if (err.response.status === 403) {
      localStorage.removeItem("user");
      window.location.href = "/";
    }
  }
);
export default instance;
