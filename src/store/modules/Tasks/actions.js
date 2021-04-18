function getProjectId() {
  const activeProject = context.rootGetters['projects/activeProject'];
  if (activeProject) {
    return activeProject.id;
  }
  return null;
}

export default {
  async addtask(context, data) {
    const projectId = getProjectId();
    const task = {
      title: data.title,
      dueDate: data.dueDate,
      priority: data.priority,
      description: data.description
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
  async loadtasks(context) {
    const projectId = getProjectId();
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
      };
      tasks.push(task);
    }

    context.commit("setTasks", tasks);
  },
  async editTask(context, data) {
    const projectId = getProjectId();
    const task = {
      id: data.id,
      title: data.title,
      dueDate: data.dueDate,
      priority: data.priority,
      description: data.description
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
  async deletetask(context, data) {
    const projectId = getProjectId();
    if (!projectId) {
      return 
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
  },
};
