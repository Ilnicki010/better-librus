import axios from "axios";
import qs from "qs";
export default {
  state: {
    token: localStorage.getItem("user-token") || "",
    status: ""
  },
  mutations: {
    AUTH_REQUEST: state => {
      state.status = "loading";
    },
    AUTH_SUCCESS: (state, token) => {
      state.status = "success";
      state.token = token;
    },
    AUTH_ERROR: state => {
      state.status = "error";
    }
  },
  getters: {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status
  },
  actions: {
    AUTH_REQUEST: ({ commit, dispatch }, user) => {
      return new Promise((resolve, reject) => {
        // The Promise used for router redirect in login
        commit("AUTH_REQUEST");
        axios({
          method: "post",
          url:
            "https://cors-anywhere.herokuapp.com/https://api.librus.pl/OAuth/Token",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization:
              "Basic Mjg6ODRmZGQzYTg3YjAzZDNlYTZmZmU3NzdiNThiMzMyYjE=",
            "Cache-Control": "no-cache"
          },
          data: qs.stringify({
            username: user.username,
            password: user.password,
            librus_long_term_token: "1",
            grant_type: "password"
          })
        })
          .then(resp => {
            const token = resp.data.access_token;
            localStorage.setItem("user-token", token);
            axios.defaults.headers.common["Authorization"] = token;
            commit("AUTH_SUCCESS", token);
            dispatch("USER_REQUEST");
            resolve(resp);
          })
          .catch(err => {
            commit("AUTH_ERROR", err);
            localStorage.removeItem("user-token");
            reject(err);
          });
      });
    }
  }
};
