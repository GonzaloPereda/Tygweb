<template>
  <v-container>
    <v-app-bar app>
      <v-toolbar color="teal">
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title> 
          <h3>Pereda Gonzalo - Trabajo Practico n2</h3>
        </v-toolbar-title>

        <v-spacer></v-spacer>
       
      </v-toolbar>
    </v-app-bar>
    <v-navigation-drawer
      app
      src="../assets/lateral.jpg"
      v-model="drawer"
      temporary
      dark
    >
      <v-layout mt-4 column align-center>
        <v-flex>
          <v-avatar :size="160">
            <v-img
              @click="$router.push('/')"
              src="../assets/logo2.jpeg"
            ></v-img>
          </v-avatar>
        </v-flex>
        <!-- <v-flex>
          <p class="white--text mt-3 headline">TP Vue-TYGWeb-2020</p>
        </v-flex> -->

        <v-divider></v-divider>

        <v-list>
          <v-list-item
            v-for="item in items"
            :key="item.title"
            link
            :to="item.route"
          >
            <v-list-item-icon>
              <v-icon color="blue">{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-layout>
    </v-navigation-drawer>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    items: [
      {
        title: "CARGAR STRAPI",
        icon: "mdi-cloud-upload",
        route: "CargardesdeAPI",
      },
      {
        title: "MOSTRAS GRAFICOS",
        icon: "mdi-calendar-range-outline",
        route: "graficos",
      },
    ],
  }),
  computed: {},
};
</script>
