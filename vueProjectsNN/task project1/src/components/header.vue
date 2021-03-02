<template>
  <header>
    <h1>{{ title }}</h1>
  </header>
</template>

<script>
import { bus } from "../main";

export default {
  props: {
    title: {
      type: String,
    },
  },
  data() {
    return {};
  },
  created() {
    bus.$on("changeTitle", (data) => {
      this.title = data;
    });
  },
};
</script>

<style>
header {
  background-color: lightgreen;
  padding: 10px;
}
h1 {
  color: #222;
  text-align: center;
}
</style>
