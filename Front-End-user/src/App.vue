<template>
  <v-app>
    <Drawer />
    <v-main>
      <router-view />
      <v-dialog v-model="loading.estado" hide-overlay persistent width="300">
        <v-card :color="loading.color" dark>
          <v-card-text>
            {{ loading.titulo }}
            <v-progress-linear
              indeterminate
              color="green"
              class="mb-0"
            ></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
      
      <Footer />
    </v-main>
  </v-app>
</template>
<script>
import { mapState } from "vuex";
import Drawer from "./components/Drawer";
import Footer from "./components/Footer";
import { mapMutations } from "vuex";
import axios from "axios";
export default {
  name: "App",
  components: {
    Drawer,
    Footer,
  },
  methods: {
    ...mapMutations(["asignartoken",]),
    cerrarLog() {
      this.authenticated.popup = false;
      console.log(this.authenticated.popup);
      this.$router.push("/login");
    },
  },
  
  data: () => ({
    drawer: true,
    token: "",
   
  }),
  computed: {
    ...mapState(["loading", "token1", "authenticated",]),
  },
};
</script>
