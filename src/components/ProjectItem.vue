<template>
  <div>
    <v-alert v-if="isDelete" dense type="success">
      Thông báo thành công!
    </v-alert>
    <v-alert v-if="isOwnwer" dense type="warning">
      You are not the owner!
    </v-alert>
    <v-container>
      <v-btn
        depressed
        class="caption text-capitalize mb-4"
        @click.stop="sortByCalendar()"
      >
        <v-icon>mdi-calendar-range </v-icon>
        <span>SortCalandar</span>
      </v-btn>
      <v-card v-for="(project, index) in projects" :key="index">
        <v-card class="pa-4" :class="project.status">
          <v-row align="center">
            <v-col lg="5" md="5" sm="4" cols="12">
              <div class="grey--text">Project title</div>
              <div>{{ project.title }}</div>
            </v-col>
            <v-col lg="2" md="2" sm="2" cols="4">
              <div class="grey--text">Owner</div>
              <div>{{ project.owner }}</div>
            </v-col>
            <v-col lg="2" md="2" sm="3" cols="3">
              <div class="grey--text">Due by</div>
              <div>{{ project.due_date.substring(0, 10) }}</div>
            </v-col>
            <v-col lg="2" md="2" sm="2" cols="3">
              <v-chip
                class="ma-2 px-6"
                color="white--text"
                :class="project.status"
              >
                {{ project.status }}
              </v-chip>
            </v-col>
            <v-col lg="1" md="1" sm="1" cols="2">
              <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn depressed class="px-0" v-bind="attrs" v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list min-width="120px" keydown>
                  <v-list-item link :to="`/my-projects/${project._id}`">
                    <v-list-item-title>Edit</v-list-item-title>
                  </v-list-item>

                  <v-list-item @click="deleteProject(project)">
                    <v-list-item-title>Delete</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-col>
          </v-row>
        </v-card>
        <v-divider></v-divider>
      </v-card>
    </v-container>
  </div>
</template>
<script>
import { apiClient } from "@/config/httpRequest";
import { mapActions } from "vuex";
import auth from "@/store/modules/auth";

export default {
  data() {
    return {
      isSort: false,
      isDelete: false,
      isOwnwer: false,
      popupEdit: false,
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
    ...mapActions(["fetchAPIProjects"]),
    sortByCalendar() {
      this.isSort = !this.isSort;

      if (!this.isSort) {
        this.project = this.projects.sort((a, b) => {
          const dateA = new Date(a.due_date);
          const dateB = new Date(b.due_date);
          return dateA - dateB;
        });
      } else {
        this.project = this.projects.sort((a, b) => {
          const dateA = new Date(a.due_date);
          const dateB = new Date(b.due_date);
          return dateB - dateA;
        });
      }
    },

    async deleteProject(project) {
      try {
        if (project.owner !== auth.state.userInfo.username) {
          this.isOwnwer = true;
          setTimeout(() => {
            this.isOwnwer = false;
          }, 3000);
          return;
        }
        const response = await apiClient.delete(`/projects/${project._id}`);
        console.log(response);
        this.isDelete = true;
        this.fetchAPIProjects();
        setTimeout(() => {
          this.isDelete = false;
        }, 3000);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
.v-chip.ongoing {
  background-color: orange !important;
}
.v-chip.completed {
  background-color: green !important;
}
.v-chip.overdue {
  background-color: red !important;
}
.v-card.ongoing {
  border-left: 4px solid orange;
}
.v-card.completed {
  border-left: 4px solid green;
}
.v-card.overdue {
  border-left: 4px solid red;
}
</style>
