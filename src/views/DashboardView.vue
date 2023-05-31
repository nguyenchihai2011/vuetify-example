<template>
  <div>
    <h1 class="h6 ma-6">Dashboard</h1>
    <project-item :projects="getProjects" />
  </div>
</template>
<script>
import ProjectItem from "@/components/ProjectItem.vue";
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      isSort: false,
    };
  },
  components: {
    ProjectItem,
  },

  methods: {
    ...mapActions(["fetchAPIProjects"]),
  },

  computed: {
    ...mapGetters(["getProjects"]),
    ...mapState(["user"]),
  },

  created() {
    this.fetchAPIProjects();
  },
};
</script>
