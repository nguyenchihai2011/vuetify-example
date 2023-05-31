<template>
  <v-card>
    <v-card-title class="text-h5 grey lighten-2"> My Project </v-card-title>
    <v-alert v-if="isUpdated" dense type="success">
      Updated successfully!
    </v-alert>
    <v-alert v-if="isOwnwer" dense type="warning">
      You are not the owner!
    </v-alert>
    <v-form ref="form" validate="valid" lazy-validation class="pa-4">
      <v-text-field
        v-model="project.title"
        label="Title"
        :counter="30"
        required
        prepend-icon="mdi-folder"
      ></v-text-field>

      <v-textarea
        v-model="project.description"
        label="Description"
        required
        prepend-icon="mdi-pen"
      ></v-textarea>

      <v-menu
        :close-on-content-click="true"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="project.due_date"
            label="Due date"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="project.due_date">
          <v-spacer></v-spacer>
        </v-date-picker>
      </v-menu>
      <v-select
        v-model="project.status"
        :items="status"
        label="Status"
        prepend-icon="mdi-timer-sand-complete"
      ></v-select>
    </v-form>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="error" @click="getProjectById"> Cancel </v-btn>
      <v-btn color="primary" @click="updateProject"> Save </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import router from "../router";
import { apiClient } from "@/config/httpRequest";
export default {
  data() {
    return {
      project: {},
      isUpdated: false,
      isOwnwer: false,
      status: ["ongoing", "completed", "overdue"],
    };
  },

  methods: {
    async getProjectById() {
      try {
        const response = await apiClient.get(
          `projects/${router.currentRoute.params.id}`
        );
        this.project = response.data;
        this.project.due_date = this.project.due_date.substring(0, 10);
      } catch (error) {
        console.log(error);
      }
    },

    async updateProject() {
      try {
        if (this.project.owner !== "Member 1") {
          this.isOwnwer = true;
          setTimeout(() => {
            this.isOwnwer = false;
          }, 3000);
          return;
        }
        // eslint-disable-next-line
        const response = await apiClient.put(
          `projects/${router.currentRoute.params.id}`,
          this.project
        );
        this.isUpdated = true;
        setTimeout(() => {
          this.isUpdated = false;
        }, 3000);
      } catch (error) {
        console.log(error);
      }
    },
  },

  created() {
    this.getProjectById();
  },
};
</script>
