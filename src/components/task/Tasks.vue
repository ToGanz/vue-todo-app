<template>
  <section id="tasks-section">
    <div class="active-project">{{ activeProject.title }}</div>
    <button class="popup btn" id="addTaskPopupButton" @click="showModal">
      Add Task
    </button>
    <task-modal
      v-if="modalIsVisible"
      :task="taskToEdit"
      @close-modal="closeModal"
    >
    </task-modal>

    <base-dialog :show="!!error" title="An error occured!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>

    <div v-if="isLoading">
      <base-spinner></base-spinner>
    </div>

    <ul id="tasks-list" class="list">
      <tasks-list
        v-for="task in uncompletedTasks"
        :key="task.title"
        :task="task"
        @show-modal="showModal"
      >
      </tasks-list>
    </ul>
    <ul id="completed-tasks-list" class="list">
      <tasks-list
        v-for="task in completedTasks"
        :key="task.title"
        :task="task"
        @show-modal="showModal"
      >
      </tasks-list>
    </ul>
  </section>
</template>

<script>
  import TasksList from "./TasksList.vue";
  import TaskModal from "./TaskModal.vue";

  export default {
    components: {
      TasksList,
      TaskModal,
    },
    data() {
      return {
        modalIsVisible: false,
        taskToEdit: null,
        isLoading: false,
        error: null,
      };
    },
    computed: {
      activeProject() {
        const project = this.$store.getters["projects/activeProject"];
        return project;
      },
      tasks() {
        const tasks = this.$store.getters["tasks/tasks"];
        return tasks;
      },
      uncompletedTasks() {
        if (this.tasks && this.tasks.length > 0) {
          return this.tasks.filter((task) => !task.completed);
        }
        return [];
      },
      completedTasks() {
        if (this.tasks && this.tasks.length > 0) {
          return this.tasks.filter((task) => task.completed);
        }
        return [];
      },
    },
    methods: {
      showModal(task) {
        this.taskToEdit = task;
        this.modalIsVisible = true;
      },
      closeModal() {
        this.taskIdToEdit = null;
        this.modalIsVisible = false;
      },
      async loadTasks() {
        this.isLoading = true;
        try {
          await this.$store.dispatch("tasks/loadTasks");
        } catch (error) {
          this.error = error.message || "Something went wrong!";
        }
        this.isLoading = false;
      },
      handleError() {
        this.error = null;
      },
    },
    watch: {
      activeProject() {
        this.loadTasks();
      },
    },
    created() {
      this.loadTasks();
    },
  };
</script>

<style scoped>
  #tasks-section {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    justify-items: center;
    grid-gap: 10px;
    font-weight: 400;
  }
  #tasks-section ul {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    justify-items: start;
    grid-gap: 10px;
  }
</style>