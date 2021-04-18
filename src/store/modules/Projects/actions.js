export default {
  async addProject(context, data) {
    const project = {
      title: data.title
    };

    const response = await fetch(
      "https://vue-todo-app-27774-default-rtdb.firebaseio.com/projects.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(project)
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || "Failed to register data!");
      throw error;
    }

    context.commit("addProject", {
      ...project,
      id: responseData.localId
    });

    context.commit("setActiveProject", {
      id: responseData.localId
    });
  },
  setActiveProject(context, data) {
    context.commit("setActiveProject", {
      id: data.projectId
    });
  },
  async deleteProject(context, data) {
    const projectId = data.projectId;
    const response = await fetch(
      `https://vue-todo-app-27774-default-rtdb.firebaseio.com/projects/${projectId}.json`,
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

    context.commit("deleteProject", {
      projectId
    });

    // in case the active Project is deleted
    const activeProject = context.getters.activeProject;
    if (activeProject && activeProject.id === projectId) {
      context.commit("setActiveProject", {
        projectId: null
      });
    }
  },
  async loadProjects(context) {
    const response = await fetch(
      "https://vue-todo-app-27774-default-rtdb.firebaseio.com/projects.json"
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || "Failed to fetch Projects.");
      throw error;
    }

    const projects = [];

    for (const key in responseData) {
      const project = {
        id: key,
        title: responseData[key].title
      };
      projects.push(project);
    }

    context.commit("setProjects", projects);
  }
};
