import axios from "axios";
export default {
  state: {
    grades: []
  },
  mutations: {
    SET_GRADES: (state, grades) => {
      state.grades = grades;
    }
  },
  getters: {
    getGradesBySubjectId: state => subjectId => {
      return state.grades.filter(grade => grade.Subject.Id === subjectId);
    }
  },
  actions: {
    fetchGrades({ commit }) {
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url:
            "https://cors-anywhere.herokuapp.com/https://api.librus.pl/2.0/Grades"
        })
          .then(data => {
            commit("SET_GRADES", data.data.Grades);
            resolve(data);
          })
          .catch(err => reject(err));
      });
    }
  }
};
