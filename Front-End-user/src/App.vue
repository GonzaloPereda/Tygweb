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

      <v-dialog persistent v-model="authenticated.popup" width="400">
        <v-card>
          <!-- <v-card-title>Atencion!</v-card-title> -->
          <v-divider></v-divider>
          <v-card-text class="px-7 pt-7 pb-7">
            <h3>POR FAVOR, INGRESAR A STRAPI</h3>
          </v-card-text>

          <v-divider></v-divider>
          <v-card-actions>
            <v-btn color="red" @click="authenticated.popup = false"
              >Cerrar</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="blue" @click="cerrarLog()"
              >Ingresar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <Footer/>
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

 mounted() {

   this.funcionn();
   var tok = this.token1;
if (this.authenticated.estado === false) {
      this.authenticated.popup = true;
    }
  //  let pw= axios.get( 
  // `http://localhost:1337/pais`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${tok}`,
  //           },
  //         }       
  //       );

//       pw.data.map(async function(tipo) {
//         this.cargarpais(tipo.paises); 
// alert(this.paises);
//   },
      //)
      
      },

  data: () => ({
    drawer: true,
    token: "",
    //pw:"",
  }),
  computed: {
    ...mapState(["loading", "token1", "authenticated","paises"]),
  },
};
</script>
