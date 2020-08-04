<template>
  <v-container>
    <v-toolbar color="red" dark shaped>
      <v-toolbar-title>API DE CERVEZAS</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-card class="mx-auto mt-3">
      <v-container fluid>
        <v-row dense>
          <v-col cols="12" md="12">
            <v-card>
              <v-img
                src="../assets/graficos.png"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="500px"
              >
                <v-card-title>Graficos</v-card-title>
              </v-img>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="light-blue" @click="$router.push('/graficos')">
                  Mostrar Graficos
                  <v-icon right dark>mdi-globe</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>

          <v-col cols="12" md="12">
            <v-card>
              <v-img 
                src="../assets/data.png"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="500px"
              >
                <v-card-title>Cargar Strapi</v-card-title>
             </v-img>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="light-blue" @click="$router.push('/CargardesdeAPI')">
                  Cargar Base de Datos
                  <v-icon right dark>mdi-calendar</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>
<script>
import { mapState } from "vuex";
export default {
  data: () => ({}),
  methods: {
    consola() {
      console.log(this.authenticated.estado);
    }
  },
  computed: {
    ...mapState(["token1", "authenticated"])
  },
  mounted() {
    if (this.authenticated.estado === false) {
      this.authenticated.popup = true;
    }
  }
};
</script>
