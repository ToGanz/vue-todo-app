import getters from "./getters.js";
import mutations from "./mutations.js";
import actions from "./actions.js";

const projectsModule = {
  namespaced: true,
  state() {
    return {
      projects: [],
      activeProject: null
    };
  },
  getters,
  mutations,
  actions
};

export default projectsModule;
