import getters from "./getters.js";
import mutations from "./mutations.js";
import actions from "./actions.js";

const tasksModule = {
  namespaced: true,
  state() {
    return {
      tasks: []
    }
  },
  getters,
  mutations,
  actions
};

export default tasksModule;
