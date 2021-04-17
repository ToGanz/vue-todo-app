export default {
  addProject(state, payload) {
    state.projects.push(payload);
  },
  setProjects(state, payload) {
    state.projects = payload;
  },
  setActiveProject(state, payload) {
    if (payload.projectId) {
      state.activeProject = state.projects.filter(project => project.id === payload.projectId)[0];
    } else {
      state.activeProject = null;
    }
  },
  deleteProject(state, payload) {
    state.projects = state.projects.filter(project => project.id !== payload.projectId);
    state.activeProject = null;
  }
};
