<template>
  <div>
    <h1 class="h6 ma-6">Dashboard</h1>

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
      isSort: false,
    };
  },
  components: {
    ProjectItem,
  },

  methods: {
    sortByCalendar() {
      this.isSort = !this.isSort;
      if (this.isSort) {
        return this.projects.sort((a, b) => {
          const dateA = new Date(a.due_date);
          const dateB = new Date(b.due_date);
          return dateA - dateB;
        });
      } else {
        return this.projects.sort((a, b) => {
          const dateA = new Date(a.due_date);
          const dateB = new Date(b.due_date);
          return dateB - dateA;
        });
      }
    },

    async fetchAPIProjects() {
      try {
        const response = await apiClient.get("projects");
        this.projects = response.data;
      } catch (error) {
        console.error("Error:", error);
      }
    },
  },

  created() {
    this.fetchAPIProjects();
  },
};
</script>
