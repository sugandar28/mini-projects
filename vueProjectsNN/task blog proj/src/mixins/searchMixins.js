export default {
  computed: {
    fliteredBlogs: function () {
      return this.blogs.filter((blog) => {
        return blog.title.match(this.search);
      });
    },
  },
};
