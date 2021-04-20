export default {
  async addTask(context, data) {
    const activeProject = context.rootGetters["projects/activeProject"];
    const projectId = activeProject.id;

    const task = {
      title: data.title,
      dueDate: data.dueDate,
      priority: data.priority,
      description: data.description,
      completed: false
    };
    const response = await fetch(
      `https://vue-todo-app-27774-default-rtdb.firebaseio.com/tasks/${projectId}.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(task)
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || "Failed to register data!");
      throw error;
    }

    const taskId = responseData.name;
    context.commit("addTask", {
      ...task,
      id: taskId
    });
  },
  async loadTasks(context) {
    const activeProject = context.rootGetters["projects/activeProject"];
    const projectId = activeProject.id;

    const response = await fetch(
      `https://vue-todo-app-27774-default-rtdb.firebaseio.com/tasks/${projectId}.json`
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || "Failed to fetch tasks.");
      throw error;
    }

    const tasks = [];

    for (const key in responseData) {
      const task = {
        id: key,
        title: responseData[key].title,
        dueDate: responseData[key].dueDate,
        priority: responseData[key].priority,
        description: responseData[key].description,
        completed: responseData[key].completed
      };
      tasks.push(task);
    }
    context.commit("setTasks", tasks);
  },
  async editTask(context, data) {
    const activeProject = context.rootGetters["projects/activeProject"];
    const projectId = activeProject.id;

    const task = {
      id: data.id,
      title: data.title,
      dueDate: data.dueDate,
      priority: data.priority,
      description: data.description,
      completed: data.completed
    };

    const response = await fetch(
      `https://vue-todo-app-27774-default-rtdb.firebaseio.com/tasks/${projectId}/${task.id}.json`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(task)
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || "Failed to register data!");
      throw error;
    }

    context.commit("editTask", task);
  },
  async deleteTask(context, data) {
    const activeProject = context.rootGetters["projects/activeProject"];
    const projectId = activeProject.id;

    if (!projectId) {
      return;
    }
    const taskId = data.taskId;
    const response = await fetch(
      `https://vue-todo-app-27774-default-rtdb.firebaseio.com/tasks/${projectId}/${taskId}.json`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || "Failed to register data!");
      throw error;
    }

    context.commit("deleteTask", {
      taskId
    });
  }
};
