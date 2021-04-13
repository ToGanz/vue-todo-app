<template>
  <header>
    <h1><span>Just do it</span></h1>
  </header>
</template>

<script>

  export default {
    data() {
      projects: []
    },
    methods: {
      addProject(title) {
        const project = {
          id: new Date().toISOString(),
          title,
          tasks = []
        }
        this.projects.push(project);
      },
      deleteProject(projectId) {
        this.projects = this.projects.filter(
        (project) => project.id !== projectId
        );
      }

    }
  };
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
