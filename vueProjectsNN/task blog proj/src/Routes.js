import showBlog from "./components/showblog.vue";

import addBlog from "./components/addblog.vue";

import listBlog from "./components/listblog.vue";
import singleBlog from "./components/singleblog.vue";
export default [
  { path: "/", component: showBlog },
  {
    path: "/add",
    component: addBlog,
  },
  {
    path: "/list",
    component: listBlog,
  },
  {
    path: "/blog/:id",
    component: singleBlog,
  },
];
