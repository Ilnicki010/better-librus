import axios from "axios";

export default {
  state: {
    teachers: []
  },
  mutations: {
    SET_TEACHERS: (state, teachers) => {
      state.teachers = teachers;
    }
  },
  getters: {
    getTeacherById: state => teacherId => {
      return state.teachers.find(el => el.Id === teacherId);
    }
  },
  actions: {
    fetchTeachers({ commit }) {
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: `${process.env.VUE_APP_CORS_SERVER_URL}/${process.env.VUE_APP_API_URL}/Users`
        })
          .then(data => {
            commit("SET_TEACHERS", data.data.Users);
            resolve(data);
          })
          .catch(err => reject(err));
      });
    }
  }
};
