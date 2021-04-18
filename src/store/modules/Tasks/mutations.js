export default {
  addTask(state, payload) {
    state.tasks.push(payload);
  },
  setTasks(state, payload) {
    state.tasks = payload;
  },
  editTask(state, payload) {
    state.tasks = state.tasks.filter(
      (task) => task.id !== payload.id
    );
    state.tasks.push(payload);
  },
  deleteTask(state, payload) {
    state.tasks = state.tasks.filter(task => task.id !== payload.taskId);
  }
};
