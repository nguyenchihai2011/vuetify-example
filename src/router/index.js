import Vue from "vue";
import VueRouter from "vue-router";
import NavbarApp from "../components/NavbarApp";
import DashboardView from "../views/DashboardView";
import ProjectsView from "../views/ProjectsView";
import TeamView from "../views/TeamView";
import ErrorView from "../views/ErrorView";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Dashboard",
    components: { default: DashboardView, "navbar-app": NavbarApp },
  },
  {
    path: "/my-projects",
    name: "my-projects",
    components: { default: ProjectsView, "navbar-app": NavbarApp },
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
  routes,
});

export default router;
