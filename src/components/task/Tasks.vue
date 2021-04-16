<template>
  <section id="tasks-section">
    <div class="active-project">{{ project.title }}</div>
    <button class="popup btn" id="addTaskPopupButton" @click="showModal">
      Add Task
    </button>
    <task-modal
      v-if="modalIsVisible"
      :task="taskToEdit"
      @close-modal="closeModal"
    >
    </task-modal>
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
    props: ["project"],
    data() {
      return {
        modalIsVisible: false,
        taskToEdit: null,
      };
    },
    computed: {
      uncompletedTasks() {
        if (this.project.tasks && this.project.tasks.length > 0) {
          return this.project.tasks.filter((task) => !task.completed);
        }
        return [];
      },
      completedTasks() {
        if (this.project.tasks && this.project.tasks.length > 0) {
          return this.project.tasks.filter((task) => task.completed);
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