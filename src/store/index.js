import Vue from "vue";
import Vuex from "vuex";

import auth from "./modules/auth.js";
import grades from "./modules/grades.js";
import subjects from "./modules/subjects.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  getters: {},
  actions: {},
  modules: {
    auth,
    grades,
    subjects
  }
});
