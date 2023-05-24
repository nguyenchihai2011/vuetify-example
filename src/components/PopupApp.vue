<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-layout justify-center class="mb-8">
        <v-btn color="success" v-bind="attrs" v-on="on">
          New project <v-icon right> mdi-plus </v-icon>
        </v-btn>
      </v-layout>
    </template>

    <v-card>
      <v-card-title class="text-h5 grey lighten-2"> New Project </v-card-title>

      <v-form ref="form" validate="valid" lazy-validation class="pa-4">
        <v-text-field
          v-model="project.title"
          label="Title"
          :counter="30"
          :rules="nameRules"
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
              v-model="project.due"
              label="Due date"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="project.due">
            <v-spacer></v-spacer>
          </v-date-picker>
        </v-menu>
      </v-form>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" text @click="cancelProject"> Cancel </v-btn>
        <v-btn color="primary" text @click="createProject(project)">
          Create
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { apiClient } from "@/config/httpRequest";
export default {
  data() {
    return {
      project: {
        title: "",
        description: "",
        owner: "Member 1",
        due_date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substring(0, 10),
        status: "ongoing",
      },
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => (v && v.length <= 30) || "Name must be less than 30 characters",
      ],
      dialog: false,
      valid: true,
    };
  },

  methods: {
    cancelProject() {
      this.project = {
        title: "",
        description: "",
        owner: "Member 1",
        due_date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substring(0, 10),
        status: "ongoing",
      };
      this.dialog = false;
    },

    async createProject(project) {
      console.log(project);
      try {
        if (this.$refs.form.validate()) {
          const response = await apiClient.post("projects", project);
          this.$refs.form.resetValidation();
          this.project = {
            title: "",
            description: "",
            owner: "Member 1",
            due_date: new Date(
              Date.now() - new Date().getTimezoneOffset() * 60000
            )
              .toISOString()
              .substring(0, 10),
            status: "ongoing",
          };
          console.log(response.data);
          this.dialog = false;
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
