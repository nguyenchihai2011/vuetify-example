<template>
  <div>
    <h1 class="h6 ma-6">My Projects</h1>

    <project-item :projects="projects" />
  </div>
</template>
<script>
import { apiClient } from "@/config/httpRequest";
import ProjectItem from "@/components/ProjectItem.vue";
export default {
  data() {
    return {
      projects: [],
    };
  },

  components: {
    ProjectItem,
  },

  methods: {
    async fetchAPIProductFilled() {
      const response = await apiClient.get("projects", {
        params: { owner: "Member 1" },
      });
      this.projects = response.data;
    },
  },

  mounted() {
    this.fetchAPIProductFilled();
  },
};
</script>
