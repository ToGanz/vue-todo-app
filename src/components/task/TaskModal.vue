<template>
  <div id="task-modal" class="modal">
    <!-- Modal content -->
    <div class="modal-content">
      <span @click="close" id="addClose" class="close-modal">&times;</span>
      <form @submit.prevent class="formInput task-form">
        <label for="task-title">Title</label>
        <input type="text" id="task-title" v-model="task.title" />
        <label for="task-description">Description</label>
        <textarea
          id="task-description"
          rows="3"
          cols="16.5"
          v-model="task.description"
        ></textarea>
        <label for="task-dueDate">Due Date</label>
        <input type="date" id="task-dueDate" v-model="task.dueDate" />
        <label for="task-priority">Priority</label>
        <input type="number" id="task-priority" v-model="task.priority" />
        <!-- <label for="task-completed">Task complete</label>
              <input type="checkbox" id="task-completed"> -->
        <button v-if="!task.id" @click="add" type="submit" class="addTask btn">
          Add Task
        </button>
        <button v-if="task.id" @click="edit" type="submit" class="editTask btn">
          Edit Task
        </button>
        <button
          v-if="task.id"
          @click="destroy"
          type="submit"
          class="deleteTask btn"
        >
          Delete Task
        </button>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    emits: ["close-modal"],
    props: ["task"],
    inject: ["addTask", "editTask", "deleteTask"],
    methods: {
      close() {
        this.$emit("close-modal");
      },
      add() {
        this.addTask(this.task);
        this.close();
      },
      edit() {
        this.editTask(this.task);
        this.close();
      },
      destroy() {
        this.deleteTask(this.task.id);
        this.close();
      },
    },
  };
</script>

<style scoped>
  /* The Modal (background) */
  .modal {
    display: block;
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0, 0, 0); /* Fallback color */
    background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
  }

  /* Modal Content/Box */
  .modal-content {
    background-color: #fefefe;
    margin: 10% auto; /* 10% from the top and centered */
    padding: 20px;
    border-radius: 8px;
    width: 250px; /* Could be more or less, depending on screen size */
    height: 320px;
  }

  /* The Close Button */
  .close-modal {
    color: var(--green);
    float: right;
    padding-left: 10px;
    font-size: 28px;
    font-weight: bold;
  }

  .close-modal:hover,
  .close-modal:focus {
    color: rgb(156, 156, 156);
    text-decoration: none;
    cursor: pointer;
  }

  .formInput {
    padding-left: 10px;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 5px;
    font-size: 14px;
    height: 100%;
  }
  textarea {
    resize: none;
  }
</style>