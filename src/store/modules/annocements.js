import axios from "axios";
export default {
  state: {
    annocements: []
  },
  mutations: {
    SET_ANNOCEMENTS: (state, annocements) => {
      state.annocements = annocements;
    }
  },
  actions: {
    fetchAllAnnocements: ({ commit }) => {
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: `${process.env.VUE_APP_CORS_SERVER_URL}/${process.env.VUE_APP_API_URL}/SchoolNotices`
        })
          .then(data => {
            commit("SET_ANNOCEMENTS", data.data.SchoolNotices);
            resolve(data.data.SchoolNotices);
          })
          .catch(err => reject(err));
      });
    }
  }
};
