<template>
  <div>
    <v-container>
      <v-btn
        depressed
        class="caption text-capitalize mb-4"
        @click="sortByCalendar"
      >
        <v-icon>mdi-calendar-range </v-icon>
        <span>SortCalandar</span>
      </v-btn>
      <v-card v-for="(project, index) in projects" :key="index">
        <v-card class="pa-4" :class="project.status">
          <v-row align="center">
            <v-col lg="6" md="6" sm="5" cols="12">
              <div class="grey--text">Project title</div>
              <div>{{ project.title }}</div>
            </v-col>
            <v-col lg="2" md="2" sm="2" cols="4">
              <div class="grey--text">Owner</div>
              <div>{{ project.owner }}</div>
            </v-col>
            <v-col lg="2" md="2" sm="3" cols="4">
              <div class="grey--text">Due by</div>
              <div>{{ project.due_date.substring(0, 10) }}</div>
            </v-col>
            <v-col lg="2" md="2" sm="2" cols="4">
              <v-chip
                class="ma-2 px-4"
                color="white--text"
                :class="project.status"
              >
                {{ project.status }}
              </v-chip>
            </v-col>
          </v-row>
        </v-card>
        <v-divider></v-divider>
      </v-card>
    </v-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isSort: false,
    };
  },
  /* eslint-disable */
  props: {
    projects: {
      type: Array,
      require: true,
    },
  },

  methods: {
    sortByCalendar() {
      this.isSort = !this.isSort;
      console.log(this.projects);
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
  },
};
</script>

<style>
.v-chip.ongoing {
  background-color: orange !important;
}
.v-chip.complete {
  background-color: green !important;
}
.v-chip.overdue {
  background-color: red !important;
}
.v-card.ongoing {
  border-left: 4px solid orange;
}
.v-card.complete {
  border-left: 4px solid green;
}
.v-card.overdue {
  border-left: 4px solid red;
}
</style>
