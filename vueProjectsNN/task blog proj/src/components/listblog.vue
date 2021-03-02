<template>
  <div v-theme:column="'narrow'" id="show-blogs">
    <h1>List Blogs Titles</h1>

    <input type="text" v-model="search" placeholder="Search blogs" />
    <div v-for="blog in fliteredBlogs" class="single-blog">
      <h2 v-rainbow>{{ blog.title | touppercase }}</h2>
    </div>
  </div>
</template>

<script>
import searchMixins from "../mixins/searchMixins";
export default {
  data() {
    return {
      search: "",
      blogs: [],
    };
  },
  methods: {},
  created() {
    this.$http
      .get("http://jsonplaceholder.typicode.com/posts")
      .then(function (data) {
        this.blogs = data.body.slice(0, 10);
      });
  },

  filters: {
    touppercase(value) {
      return value.toUpperCase();
    },
    snippet(value) {
      return value.slice(0, 100) + "  ...........";
    },
  },
  directives: {
    rainbow: {
      bind(el, binding, vnode) {
        el.style.color = "#" + Math.random().toString().slice(2, 8);
      },
    },
    theme: {
      bind(el, binding, vnode) {
        if (binding.value === "wide") {
          el.style.maxWidth = "1200px";
        } else if (binding.value === "narrow") {
          el.style.maxWidth = "800px";
        }
        if ((binding.arg = "column")) {
          el.style.background = "#fff";
          el.style.padding = "20px";
        }
      },
    },
  },
  mixins: [searchMixins],
};
</script>

<style>
#show-blogs {
  max-width: 800px;
  margin: 0px auto;
}
.single-blog {
  padding: 20px;
  margin: 20px 0;
  box-sizing: border-box;
  background: #eee;
}
</style>
