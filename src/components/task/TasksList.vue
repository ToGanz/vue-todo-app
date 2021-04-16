<template>
  <li class="task" v-bind:class="task.completed ? 'finished' : 'unfinished'">
    <div class="inner-task">
      <h1>{{ task.title }}</h1>
      <h3>Priority: {{ task.priority }}</h3>
      <h4>Due: {{ date }}</h4>
      <p>{{ task.description }}</p>
    </div>
    <button @click="showModal" class="editTaskPopup btn icon">Edit Task</button>
    <div class="checks">
      <label class="checkbox-label" for="check">
        {{ task.completed ? "completed!" : "completed?" }}
      </label>
      <input
        class="check"
        name="chckbox"
        type="checkbox"
        v-model="task.completed"
      />
    </div>
  </li>
</template>

<script>
  export default {
    emits: ["show-modal"],
    props: ["task"],
    computed: {
      date() {
        if (this.task.dueDate) {
          const formattedDate =
            this.task.dueDate.slice(8, 10) +
            "." +
            this.task.dueDate.slice(5, 7) +
            "." +
            this.task.dueDate.slice(0, 4);
          return formattedDate;
        }
        return null;
      },
    },
    methods: {
      showModal() {
        this.$emit("show-modal", this.task);
      },
    },
  };
</script>

<style scoped>
  .task {
    text-align: start;
    padding: 10px 10px 0 10px;
    display: grid;
    grid-template-columns: minmax(150px, 400px) 100px;
    grid-gap: 10px;
    margin-top: 5px;
    color: var(--gray);
  }
  .inner-task {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(75px, 1fr));
    grid-template-rows: auto auto auto;
    grid-gap: 10px;
    color: var(--gray);
  }

  .inner-task h1 {
    grid-column: 1 / 3;
    grid-row: 1 / 2;
    font-size: 20px;
    font-weight: bold;
    color: var(--black);
    padding-left: 20px;
  }

  .inner-task h3 {
    grid-column: 1 / 2;
    grid-row: 2 / 3;
    font-size: 12px;
    padding: 5px 20px;
  }

  .inner-task h4 {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
    font-size: 12px;
    padding: 5px 20px;
  }

  .inner-task p {
    grid-column: 1 / 3;
    grid-row: 3 / 4;
    font-size: 14px;
    padding: 5px 20px;
  }

  .checks {
    grid-column: 2 / 3;
    grid-row: 4 / 5;
    display: grid;
    grid-template-columns: auto auto;
    justify-items: end;
    padding: 5px;
  }
  .checks label {
    display: inline-block;
    font-size: 12px;
    width: 70px;
    margin-right: 7px;
    white-space: nowrap;
    vertical-align: middle;
  }
  .checks .check {
    vertical-align: middle;
    margin: 0px;
  }

  .finished {
    background-color: rgb(0, 0, 0); /* Fallback color */
    background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
  }
</style>