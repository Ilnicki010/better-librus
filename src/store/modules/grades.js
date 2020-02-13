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
    getGradesBySubjectAndSemester: state => (subjectId, semester) => {
      return state.grades.filter(el => {
        if (
          el.grade.Subject.Id === subjectId &&
          el.grade.Semester === semester &&
          !el.grade.IsSemesterProposition &&
          !el.grade.IsSemester &&
          !el.grade.IsFinalProposition &&
          !el.grade.IsFinal
        ) {
          return el;
        }
      });
    },
    getFinalAndPropositionGrades: state => (subjectId, semester) => {
      return state.grades.filter(el => {
        if (
          (el.grade.Subject.Id === subjectId &&
            el.grade.Semester === semester &&
            el.grade.IsSemesterProposition) ||
          el.grade.IsSemester ||
          el.grade.IsFinalProposition ||
          el.grade.IsFinal
        ) {
          return el;
        }
      });
    },
    getAllGrades: state => {
      return state.grades;
    }
  },
  actions: {
    async fetchGrades({ commit, dispatch }) {
      const gradesWithCategories = [];
      const results = await axios({
        method: "get",
        url: `${process.env.VUE_APP_CORS_SERVER_URL}/${process.env.VUE_APP_API_URL}/Grades`
      });

      results.data.Grades.forEach(async grade => {
        await dispatch("fetchCategoryById", grade.Category.Id).then(data => {
          gradesWithCategories.push({
            grade,
            category: {
              ...data
            }
          });
        });
        return gradesWithCategories;
      });

      commit("SET_GRADES", gradesWithCategories);
    }
  }
};
