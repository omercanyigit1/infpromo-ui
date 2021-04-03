import React from "react";

//Auth Pages
const PageCoverLogin = React.lazy(() =>
  import("./pages/Pages/AuthPages/PageCoverLogin")
);
const PageCoverSignup = React.lazy(() =>
  import("./pages/Pages/AuthPages/PageCoverSignup")
);


const PageCoverRePassword = React.lazy(() =>
  import("./pages/Pages/AuthPages/PageCoverRePassword")
);
const PageRecoveryPassword = React.lazy(() =>
  import("./pages/Pages/AuthPages/PageRecoveryPassword")
);

// Import all components


const Saas = React.lazy(() => import("./pages/Saas/index"));

//Blog
const PageBlog = React.lazy(() => import("./pages/Pages/Blog/PageBlog"));
const PageBlogDetail = React.lazy(() =>
  import("./pages/Pages/Blog/PageBlogDetail")
);
const PageBlogDetailTwo = React.lazy(() =>
  import("./pages/Pages/Blog/PageBlogDetailTwo")
);
const PageBlogSidebar = React.lazy(() =>
  import("./pages/Pages/Blog/PageBlogSidebar")
);
const PageBlogList = React.lazy(() =>
  import("./pages/Pages/Blog/PageBlogList")
);
const PageBlogListSidebar = React.lazy(() =>
  import("./pages/Pages/Blog/PageBlogListSidebar")
);

const routes = [
  //routes without Layout

  //User Pages
  {
    path: "/login",
    component: PageCoverLogin,
    isWithoutLayout: true,
  },

  {
    path: "/register",
    component: PageCoverSignup,
    isWithoutLayout: true,
  },

  {
    path: "/reset-password/:id",
    component: PageRecoveryPassword,
    isWithoutLayout: true,
  },
  {
    path: "/forget-password",
    component: PageCoverRePassword,
    isWithoutLayout: true,
  },

  //Page Blog
  { path: "/page-blog-grid", component: PageBlog },
  { path: "/page-blog-detail", component: PageBlogDetail },
  { path: "/page-blog-detail-two", component: PageBlogDetailTwo },
  { path: "/page-blog-sidebar", component: PageBlogSidebar },
  { path: "/page-blog-list", component: PageBlogList },
  { path: "/page-blog-list-sidebar", component: PageBlogListSidebar },

  //Index root
  { path: "/", component: Saas, isWithoutLayout: false, exact: true },
];

export default routes;
