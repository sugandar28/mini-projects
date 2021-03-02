<template>
  <div id="courses">
    <ul>
      <li v-for="course in courses" v-on:click="course.show = !course.show">
        <h2>{{ course.name }}</h2>
        <h3 v-show="course.show">{{ course.details }}</h3>
      </li>
    </ul>
    <button @click="deletecourse">Remove</button>
  </div>
</template>

<script>
export default {
  props: {
    courses: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    deletecourse: function () {
      this.courses.pop();
    },
  },

  beforeCreate() {
    alert("b4create");
  },
  created() {
    alert("created");
  },
  beforeMount() {
    alert("beforeMount");
  },
  mounted() {
    alert("mounted");
  },
  beforeUpdate() {
    alert("beforeUpdate");
  },
  updated() {
    alert("Updated");
  },
};
</script>

<style>
#courses {
  width: 100%;
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 20px;
  box-sizing: border-box;
}
ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
li {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 30px;
  border: 1px solid #222;
  margin: 10px;
}
</style>
