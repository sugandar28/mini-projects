<template>
  <div>
    <app-header :title="title"></app-header>
    <app-course :courses="courses"></app-course>
    <app-footer :copyright="copyright" :title="title"></app-footer>
  </div>
</template>

<script>
import Header from "./components/header.vue";
import Footer from "./components/footer.vue";
import Course from "./components/course.vue";
export default {
  components: {
    "app-header": Header,
    "app-footer": Footer,
    "app-course": Course,
  },
  data() {
    return {
      courses: [
        { name: "html", details: "semantic", show: false },
        { name: "css", details: "styling ", show: false },
        { name: "js", details: "dynamic sites", show: false },
        { name: "react", details: "Conditionals", show: false },
        { name: "vue", details: "open sourse ", show: false },
        { name: "firebase", details: "develped by google ", show: false },
      ],
      title: "Course Deails",
      copyright: "Copyright 2020",
    };
  },
  methods: {
    updateTitle: function (updatedTitle) {
      this.title = updatedTitle;
    },
  },
};
</script>

<style></style>
