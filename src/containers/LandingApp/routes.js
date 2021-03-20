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

const PageMembers = React.lazy(() =>
  import("./pages/Pages/Account/PageMembers")
);
const PageWorks = React.lazy(() => import("./pages/Pages/Account/PageWorks"));
const PageMessages = React.lazy(() => import("./pages/Pages/Account/PageMessages"));

//Account
const PageProfile = React.lazy(() =>
  import("./pages/Pages/Account/PageProfile")
);
const PageProfileEdit = React.lazy(() =>
  import("./pages/Pages/Account/PageProfileEdit")
);
const PagePayments = React.lazy(() =>
  import("./pages/Pages/Account/PagePayments")
);
const PageInvoice = React.lazy(() =>
  import("./pages/Pages/Account/PageInvoice")
);

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

//Email
const EmailAlert = React.lazy(() =>
  import("./pages/Pages/EmailTemplate/EmailAlert")
);
const EmailPasswordReset = React.lazy(() =>
  import("./pages/Pages/EmailTemplate/EmailPasswordReset")
);
const EmailConfirmation = React.lazy(() =>
  import("./pages/Pages/EmailTemplate/EmailConfirmation")
);
const EmailInvoice = React.lazy(() =>
  import("./pages/Pages/EmailTemplate/EmailInvoice")
);

const routes = [
  //routes without Layout


  //Email Pages
  { path: "/email-alert", component: EmailAlert, isWithoutLayout: true },
  {
    path: "/email-password-reset",
    component: EmailPasswordReset,
    isWithoutLayout: true,
  },
  {
    path: "/email-confirmation",
    component: EmailConfirmation,
    isWithoutLayout: true,
  },
  { path: "/email-invoice", component: EmailInvoice, isWithoutLayout: true },


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
    path: "/auth-re-password",
    component: PageRecoveryPassword,
    isWithoutLayout: true,
  },
  {
    path: "/forget-password",
    component: PageCoverRePassword,
    isWithoutLayout: true,
  },

  //Page Profile
  { path: "/page-profile", component: PageProfile },
  { path: "/page-members", component: PageMembers },
  { path: "/page-works", component: PageWorks },
  { path: "/page-messages", component: PageMessages },
  { path: "/page-profile-edit", component: PageProfileEdit },
  { path: "/page-payments", component: PagePayments },
  { path: "/page-invoice", component: PageInvoice },


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
