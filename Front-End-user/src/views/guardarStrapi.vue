<template>
  <v-container>
    <Toolbarprop titulo="Actualizar" />
    <v-card class="mx-auto mt-6">
      <v-container fluid>
        <v-row dense>
          <v-col cols="12" md="12">
            <v-card>
              <v-img
                src="../assets/cerveza.jpg"
                class="black--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="300px"
              >
              </v-img>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-container fluid>
                  <v-row align="center">
                    <v-col cols="12" md="12"> </v-col>
                    <v-col cols="12" md="12">
                      <v-btn block color="blue" @click="setusuario()"
                        >Cargar datos en strapi
                        <v-icon right dark>mdi-cloud-upload</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <v-snackbar v-model="snackbar">
      {{ textSnackbar }}
      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>
<script>
import Toolbarprop from "../components/Toolbar";
import { mapMutations } from "vuex";
import axios from "axios";
import { mapState } from "vuex";
export default {
  components: {
    Toolbarprop,
  },
  name: "CargarAPI",
  data() {
    return {
      snackbar: false,
      number: 0,
      token: "",
      loading: true,
      errored: false,
      personajes: {
        name: "",
        occupation: "",
        nickname: "",
        edad: "",
        status: "",
      },
    };
  },
  computed: {
    ...mapState(["token1", "authenticated"]),
  },
  methods: {
    ...mapMutations([
      "mostrarLoading",
      "ocultarLoading",
      "asignartoken",
      "authenticatedT",
    ]),
    numberRandom: function(n) {
      this.number = Math.floor(Math.random() * n);
    },
    async logstrapi() {
      axios
        .post("http://localhost:1337/auth/local", {
          identifier: "api-user@example.com",
          password: "123456",
        })
        .then((response) => {
          this.token = response.data.jwt;
          this.asignartoken(this.token);
        });
      this.$router.push(this.$route.query.redirect || "/");
      this.authenticatedT();
      this.authenticated.popup = false;
    },
    async setusuario() {
      this.logstrapi();
      if (this.authenticated.estado === false) {
        this.authenticated.popup = true;
      } else {
        try {
          this.mostrarLoading({
            titulo: "Cargando los datos",
            color: "secondary",
          });
          var tok = this.token1;
          for (let i = 0; i < 5; i++) {
            this.numberRandom(99);
            this.personajes.edad = this.number;
            this.numberRandom(25);
            await axios
              .get("https://breakingbadapi.com/api/characters")
              .then((response) => {
                this.personajes.occupation =
                  response.data[this.number].occupation[0];
                this.personajes.nickname = response.data[this.number].nickname;
                this.personajes.status = response.data[this.number].status;
                this.personajes.name = response.data[this.number].name;
              });
            let data = {
              name: this.personajes.name,
              occupation: this.personajes.occupation,
              ninckname: this.personajes.nickname,
              edad: this.personajes.edad,
              status: this.personajes.status,
            };
            console.log(data);
            await axios.post("http://localhost:1337/personajes", data, {
              headers: {
                Authorization: `Bearer ${tok}`,
              },
            });
          }
        } catch (error) {
          console.log(error);
        } finally {
          this.ocultarLoading();
          this.textSnackbar = "Ya esta actualizado";
          this.snackbar = true;
        }
        this.textSnackbar = "Ya esta actualizado";
        this.snackbar = true;
      }
    },
    mostrarSnackbar() {
      this.snackbar = true;
      this.textSnackbar = "Los datos fueron actualizados";
    },
  },
  mounted() {
    if (this.authenticated.estado === false) {
      this.authenticated.popup = true;
    }
  },
};
</script>
