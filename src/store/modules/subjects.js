import axios from "axios";
export default {
  state: {
    subjects: []
  },
  mutations: {
    SET_SUBJECTS: (state, subjects) => {
      state.subjects = subjects;
    }
  },
  getters: {},
  actions: {
    fetchSubjects({ commit }) {
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url:
            "https://cors-anywhere.herokuapp.com/https://api.librus.pl/2.0/Subjects"
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
