<template>
  <header>
    <h1><span>Just do it</span></h1>
  </header>
  <project-list></project-list>
  <tasks v-if="activeProject && Object.keys(activeProject).length > 0">
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
    computed: {
      activeProject() {
        const project = this.$store.getters["projects/activeProject"];
        return project;
      },
    },
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
