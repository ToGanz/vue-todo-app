<template>
  <header>
    <h1><span>Just do it</span></h1>
  </header>
  <project-list
    :projects="projects"
    @add-project="addProject"
    @delete-project="deleteProject"
    @set-active-project="setActiveProject"
  ></project-list>
  <tasks
    v-if="activeProject && Object.keys(activeProject).length > 0"
    :project="activeProject"
  >
  </tasks>
</template>

<script>
  import ProjectList from "./components/ProjectList.vue";
  import Tasks from "./components/task/Tasks.vue";

  export default {
    components: {
      ProjectList,
      Tasks,
    },
    data() {
      return {
        projects: [
          {
            id: 1,
            title: "project 1",
            tasks: [
              {
                id: 1,
                title: "task 1",
                description: "description 1",
                dueDate: "2022-02-21",
                priority: 2,
                completed: false,
              },
              {
                id: 2,
                title: "task 2",
                description: "description 2",
                dueDate: "2022-02-21",
                priority: 3,
                completed: false,
              },
              {
                id: 3,
                title: "task 3",
                description: "description 3",
                dueDate: "2022-03-31",
                priority: 3,
                completed: true,
              },
            ],
          },
        ],
        activeProject: {},
        isLoading: false,
        error: null,
      };
    },
    provide() {
      return {
        addTask: this.addTask,
        editTask: this.editTask,
        deleteTask: this.deleteTask,
      };
    },
    methods: {
      loadProjects() {
        this.isLoading = true;
        this.error = null;
        fetch(
          "https://vue-todo-app-27774-default-rtdb.firebaseio.com/projects.json"
        )
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
          })
          .then((data) => {
            this.isLoading = false;
            const projects = [];
            for (const id in data) {
              projects.push({
                id: id,
                title: data[id].title,
                tasks: data[id].tasks,
              });
            }
            this.projects = projects;
          })
          .catch((error) => {
            console.log(error);
            this.isLoading = false;
            this.error = "Failed to fetch data - please try again later.";
          });
      },
      // Project
      async addProject(title) {
        const project = {
          id: new Date().toISOString(),
          title
        };

        const response = await fetch(
          "https://vue-todo-app-27774-default-rtdb.firebaseio.com/projects.json",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(project),
          }
        );
        this.projects.push(project);
      },
      deleteProject(projectId) {
        this.projects = this.projects.filter(
          (project) => project.id !== projectId
        );
        this.activeProject = {};
      },
      setActiveProject(projectId) {
        this.activeProject = this.projects.filter(
          (project) => project.id === projectId
        )[0];
      },
      // Tasks
      addTask(task) {
        console.log(task)
        console.log(this.activeProject)
        this.activeProject.tasks.push({
          id: new Date().toISOString(),
          ...task,
        });
        console.log(task)
      },
      deleteTask(taskId) {
        this.activeProject.tasks = this.activeProject.tasks.filter(
          (task) => task.id !== taskId
        );
      },
      editTask(updatedTask) {
        this.activeProject.tasks = this.activeProject.tasks.filter(
          (task) => task.id !== updatedTask.id
        );
        this.activeProject.tasks.push(updatedTask);
      },
    },
    mounted() {
      this.loadProjects();
    }
  };
</script>

<style>
  :root {
    --green: #48bb78;
    --light_green: #c6f6d5;
    --black: #2d3748;
    --gray: rgba(74, 85, 104, 1);
  }
  html {
    /* border-box box model allows us to add padding and border to our elements without increasing their size */
    box-sizing: border-box;
    /* A system font stack so things load nice and quick! */
    font-family: Source Sans Pro, sans-serif;
    font-weight: 600;
    font-size: 16px;
    letter-spacing: 0.05rem;
    color: var(--black);
    margin: 0;
    padding: 0;
    position: relative;
    text-shadow: 0 2px 0 rgba(0, 0, 0, 0.07);
  }

  /*
              WAT IS THIS?!
              We inherit box-sizing: border-box; from our <html> selector
              Apparently this is a bit better than applying box-sizing: border-box; directly to the * selector
              */
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  body {
    padding: 15px;
  }

  .btn {
    background-color: #ffffff;
    color: var(--black);
    border: 1px solid var(--light_green);
    border-radius: 0.25rem;
    display: inline-block;
    cursor: pointer;
    font-weight: bold;
    padding: 6px 16px;
    margin-top: 5px;
    text-decoration: none;
    height: 30px;
  }
  .btn:hover {
    background-color: var(--light_green);
  }
  .btn:active {
    position: relative;
    top: 1px;
  }
  .btn:focus {
    outline: 1px auto var(--green);
  }

  .hidden {
    visibility: hidden;
  }

  #app {
    display: grid;
    grid-template-columns: 1fr;
    justify-items: center;
    grid-gap: 20px;
    max-width: 1000px;
    margin: auto;
  }

  header,
  h1 {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }

  ul {
    margin: 0;
    padding: 0;
  }

  li {
    list-style: none;
    border: 1px solid rgba(237, 242, 247, 1);
    border-radius: 0.25rem;
    padding: 2.5rem;
    margin-bottom: 3rem;
    transition: 0.15s;
  }

  li:hover,
  button:hover {
    transform: scale(1.02);
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 10%), 0 4px 6px -2px rgb(0 0 0 / 5%);
  }

  h1 span {
    border-bottom: 4px solid var(--green);
  }

  li h1 {
    border-bottom: 4px solid var(--light_green);
  }

  input:focus {
    outline: 1px auto var(--green);
  }
</style>
