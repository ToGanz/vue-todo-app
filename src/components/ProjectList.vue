<template>
  <section class="project-section">
    <base-dialog :show="!!error" title="An error occured!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <form @submit.prevent="submitForm" class="formInput project-form">
      <label for="project-title">Title</label>
      <input type="text" id="project-title" v-model="enteredTitle" />
      <button type="submit" class="addProject btn">Create Project</button>
      <p class="errors" v-if="!formIsValid">Please enter a title.</p>
    </form>
    <button
      :aria-expanded="expanded"
      aria-controls="mobile-menu"
      class="btn"
      id="projects-button"
      @click="toggleNav"
    >
      <span class="open">☰</span>
      <span class="close">×</span>
      Projects
    </button>
    <div v-if="isLoading">
      <base-spinner></base-spinner>
    </div>
    <ul class="mobile-menu list" id="projects-list">
      <li
        class="project"
        v-for="project in projects"
        :key="project.id"
        @click="setActiveProject(project.id)"
      >
        <h1 class="project-title">{{ project.title }}</h1>
        <span @click="deleteProject(project.id)" class="close-project">x</span>
      </li>
    </ul>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        enteredTitle: "",
        expanded: false,
        isLoading: false,
        error: null,
        formIsValid: true,
      };
    },
    computed: {
      projects() {
        const projects = this.$store.getters["projects/projects"];
        return projects;
      },
    },
    methods: {
      toggleNav() {
        this.expanded = !this.expanded;
      },
      async submitForm() {
        this.formIsValid = true;
        if (this.enteredTitle === "") {
          this.formIsValid = false;
          return;
        }

        try {
          await this.$store.dispatch("projects/addProject", {
            title: this.enteredTitle,
          });
          this.expanded = true;
        } catch (error) {
          this.error = error.message || "Something went wrong!";
        }
      },
      async deleteProject(projectId) {
        try {
          await this.$store.dispatch("projects/deleteProject", {
            projectId,
          });
          this.expanded = true;
        } catch (error) {
          this.error = error.message || "Something went wrong!";
        }
      },
      setActiveProject(projectId) {
        this.$store.dispatch("projects/setActiveProject", {
          projectId,
        });
      },
      async loadProjects() {
        this.isLoading = true;
        try {
          await this.$store.dispatch("projects/loadProjects");
        } catch (error) {
          this.error = error.message || "Something went wrong!";
        }
        this.isLoading = false;
      },
      handleError() {
        this.error = null;
      },
    },
    created() {
      this.loadProjects();
    },
  };
</script>

<style scoped>
  h1 {
    font-size: 100%;
  }
  /* Mobile menu */
  /* Navigation */
  .project-section {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    justify-items: center;
    text-align: center;
    grid-gap: 20px;
  }

  .project-section ul {
    width: 100%;
    display: grid;
    grid-gap: 10px;
    padding: 0;
    list-style: none;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }

  .project-section li {
    display: block;
    text-decoration: none;
    padding: 10px;
    text-align: center;
    color: var(--black);
    text-transform: uppercase;
    font-size: 20px;
  }

  [aria-controls="mobile-menu"] {
    display: none;
  }

  #projects-button {
    display: none;
  }

  @media (max-width: 1000px) {
    #projects-button {
      display: block;
      margin-bottom: 10px;
    }

    [aria-controls="mobile-menu"] {
      display: block;
      margin-bottom: 10px;
    }

    .project-section ul {
      max-height: 0;
      overflow: hidden;
      transform: rotateX(90deg);
      transition: all 0.5s ease-out;
    }

    [aria-expanded="true"] ~ ul {
      display: grid;
      max-height: 500px;
      transform: rotateX(0);
    }

    [aria-expanded="false"] .close {
      display: none;
    }

    [aria-expanded="true"] .close {
      display: inline-block;
    }

    [aria-expanded="true"] .open {
      display: none;
    }
  }
  .project-section {
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 4px solid var(--green);
  }

  /* The Close Button */
  .close-project {
    color: var(--light_green);
    float: right;
    padding-left: 10px;
    font-size: 28px;
    font-weight: bold;
  }
  .close-project:hover {
    color: var(--green);
  }
</style>