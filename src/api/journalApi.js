import axios from "axios";

const journalApi = axios.create({
  baseURL: "https://my-journal-application-default-rtdb.firebaseio.com",
});
journalApi.interceptors.request.use((config) => {
  config.params = {
    auth: localStorage.getItem("idToken"),
  };
  return config;
});
export default journalApi;
