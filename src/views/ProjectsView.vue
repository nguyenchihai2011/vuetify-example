<template>
  <div>
    <h1 class="h6 ma-6">My Projects</h1>
    <project-item :projects="getProjectByUser" />
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import ProjectItem from "@/components/ProjectItem.vue";
export default {
  components: {
    ProjectItem,
  },

  methods: {
    ...mapActions(["fetchAPIProjects"]),
  },

  computed: {
    ...mapGetters(["getProjectByUser"]),
  },

  created() {
    this.fetchAPIProjects();
  },
};
</script>
