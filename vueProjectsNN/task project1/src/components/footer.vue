<template>
  <footer>
    <p @click="changetitle">{{ copyright }} {{ title }}</p>
  </footer>
</template>

<script>
import { bus } from "../main";
export default {
  props: {
    copyright: {
      type: String,
    },
    title: {
      type: String,
    },
  },
  data() {
    return {};
  },
  methods: {
    changetitle: function () {
      bus.$emit("changeTitle", "course");
      this.title = "course";
    },
  },
};
</script>

<style>
footer {
  background: #222;
  padding: 6px;
}
p {
  text-align: center;
  color: white;
}
</style>
