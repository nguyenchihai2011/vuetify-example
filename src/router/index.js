import Vue from "vue";
import VueRouter from "vue-router";
import LoginView from "../views/LoginView";
import NavbarApp from "../components/NavbarApp";
import DashboardView from "../views/DashboardView";
import MyProjectView from "../views/MyProjectView";
import ProjectsView from "../views/ProjectsView";
import ProjectItemEdit from "@/components/ProjectItemEdit";
import TeamView from "../views/TeamView";
import ErrorView from "../views/ErrorView";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: LoginView,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    components: { default: DashboardView, "navbar-app": NavbarApp },
  },
  {
    path: "/my-projects",
    components: { default: MyProjectView, "navbar-app": NavbarApp },
    children: [
      {
        path: "",
        name: "my-projects",
        component: ProjectsView,
      },
      {
        path: ":id",
        name: "my-project-edit",
        component: ProjectItemEdit,
      },
    ],
  },
  {
    path: "/team",
    name: "team",
    components: { default: TeamView, "navbar-app": NavbarApp },
  },
  {
    path: "/error",
    name: "error",
    component: ErrorView,
  },
  {
    path: "*",
    redirect: "/error",
  },
];

const router = new VueRouter({
  // mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  if (!checkUserLoggedIn()) {
    if (to.path !== "/") {
      next("/");
    } else {
      next();
    }
  } else {
    if (to.path === "/") {
      next("dashboard");
    } else {
      next();
    }
  }
});

function checkUserLoggedIn() {
  // Kiểm tra xem người dùng đã đăng nhập chưa, trả về true hoặc false
  return (
    !!localStorage.getItem("token") ||
    !!localStorage.getItem("vue-authenticate.vueauth_token")
  );
}

export default router;
