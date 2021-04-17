import { createStore } from "vuex";

import projectsModule from "./modules/Projects/index.js";
import tasksModule from "./modules/Tasks/index.js";

const store = createStore({
  modules: {
    tasks: tasksModule,
    projects: projectsModule
  }
});

export default store;
