import axios from "axios";
export default {
  state: {
    subjects: [],
    test: 0
  },
  mutations: {
    SET_SUBJECTS: (state, subjects) => {
      state.subjects = subjects;
    },
    ADD: state => {
      state.test++;
    }
  },
  getters: {},
  actions: {
    fetchSubjectById({ commit }, id) {
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: `${process.env.VUE_APP_CORS_SERVER_URL}/${process.env.VUE_APP_API_URL}/Subjects/${id}`
        })
          .then(data => {
            commit("ADD");
            resolve(data);
          })
          .catch(err => reject(err));
      });
    },
    fetchSubjects({ commit }) {
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: `${process.env.VUE_APP_CORS_SERVER_URL}/${process.env.VUE_APP_API_URL}/Subjects`
        })
          .then(data => {
            commit("SET_SUBJECTS", data.data.Subjects);
            resolve(data);
          })
          .catch(err => reject(err));
      });
    }
  }
};
