import getters from "./getters.js";
import mutations from "./mutations.js";
import actions from "./actions.js";

const projectsModule = {
  namespaced: true,
  state() {
    return {
      projects: [
        {
          id: 1,
          title: "project 1"
        },
        {
          id: 2,
          title: "project 2"
        }
      ],
      activeProject: null
    };
  },
  getters,
  mutations,
  actions
};

export default projectsModule;
