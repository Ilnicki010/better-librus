import axios from "axios";
export default {
  state: {
    curentCategory: null,
    categories: []
  },
  mutations: {
    SET_CURRENT_CATEGORY: (state, category) => {
      state.curentCategory = category;
    },
    SET_CATEGORIES: (state, categories) => {
      state.categories = categories;
    }
  },
  getters: {
    getCategoryById: state => categoryId => {
      return state.categories.find(category => category.Id === categoryId);
    }
  },
  actions: {
    fetchCategoryById({ commit }, categoryId) {
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: `${process.env.VUE_APP_CORS_SERVER_URL}/${process.env.VUE_APP_API_URL}/Grades/Categories/${categoryId}`
        })
          .then(data => {
            commit("SET_CURRENT_CATEGORY", data.data.Category);
            resolve(data.data.Category);
          })
          .catch(err => reject(err));
      });
    },
    fetchAllCategories({ commit }) {
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: `${process.env.VUE_APP_CORS_SERVER_URL}/${process.env.VUE_APP_API_URL}/Grades/Categories`
        })
          .then(data => {
            commit("SET_CATEGORIES", data.data.Categories);
            resolve(data.data.Categories);
          })
          .catch(err => reject(err));
      });
    }
  }
};
