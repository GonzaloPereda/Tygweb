<template>
  <v-container>
    <Toolbarprop titulo="Actualizar Estadisticas desde la API a Strapi" />
    <v-card class="mx-auto mt-3">
      <v-container fluid>
        <v-row dense>
          <v-col cols="12" md="12">
            <v-card>
              <v-img
                src="../assets/bd.jpg"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="200px">
                <v-card-title
                  >Cargar Base de Datos</v-card-title
                >
              </v-img>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-container fluid>
                  <v-row align="center">
                    <v-col cols="12" md="12">
                      <!-- <v-select
                        v-model="selected"
                        :items="paises"
                        menu-props="auto"
                        label="Seleccionar"
                        hide-details
                        prepend-icon="mdi-map-marker"
                        single-line
                      ></v-select> -->
                    </v-col>
                    <v-col cols="12" md="12">
                      <v-btn
                        block
                        color="success"
                        @click="setusuario()"
                        >Cargar datos de los usuarios en strapi
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
      selected: "Argentina",
      snackbar: false,
      number: 0,
      textSnackbar: "",
      //paises: ["Iran", "Brazil", "France", "Spain"],
      //  paises =
      //           get( 
      //             `http://localhost:1337/pais/count?pais=${data1.pais}`,
      //                     {
      //                       headers: {
      //                         Authorization: `Bearer ${this.token1}`,
      //                       },
      //                     }
                        
      //                   ),
     token: "",
      info: {},
      loading: true,
      errored: false,
      resumen: {},
      countries: {},
      ultimo: 0,
      
      cerveza: {
        nombre: "",
        lema:"",
        alcohol:"",
        amargor:"",
        

      },

      totalcasosdeldia: 0,
      diaanterior: 0,
      casosdeldia1: 0,
      dia: 0,
    };
  },
  computed: {
    ...mapState(["token1", "authenticated","paises"]),
  },
  methods: {
...mapMutations(["mostrarLoading", "ocultarLoading","cargarpais"]),
numberRandom: function () {
      this.number = Math.floor(Math.random() * (25));
      
    },

  async setusuario() {



      if (this.authenticated.estado === false) {
        this.authenticated.popup = true;
      } else {
        try {
          this.mostrarLoading({
            titulo: "Cargando los datos",
            color: "secondary",
          });
    var tok = this.token1;
        for (let i = 0; i < 11; i++){
          this.numberRandom();
          
         await axios        
            .get("https://api.punkapi.com/v2/beers")
            .then((response) => {
            //  console.log(response.data[0].name);
            //  console.log(response.data[0].tagline);
            //  console.log(response.data[0].abv);
            //  console.log(response.data[0].ibu);

             this.cerveza.nombre=response.data[this.number].name,
             this.cerveza.lema=response.data[this.number].tagline,
             this.cerveza.alcohol=response.data[this.number].abv,
             this.cerveza.amargor=response.data[this.number].ibu

             console.log(this.cerveza.nombre);
             console.log(this.cerveza.lema);
             console.log(this.cerveza.alcohol);
             console.log(this.cerveza.amargor);
            //  console.log(response.data.results[0].gender);
            //  console.log(response.data.results[0].name.first);
            //  console.log(response.data.results[0].name.last);
            //  console.log(response.data.results[0].location.country);
            //  console.log(response.data.results[0].dob.age);
            //  console.log(response.data.results[0].email);
            //   this.usuario.nombre=response.data.results[0].name.first,
            //   this.usuario.apellido=response.data.results[0].name.last,
            //   this.usuario.sexo=response.data.results[0].gender,
            //   this.usuario.pais=response.data.results[0].location.country,
            //   this.usuario.email=response.data.results[0].email,
            //   this.usuario.edad=response.data.results[0].dob.age
            });

        
      
              let data = {
            nombre: this.cerveza.nombre,
            lema: this.cerveza.lema,
            alcohol:  this.cerveza.alcohol,
            amargor: this.cerveza.amargor,
           
          };
          console.log(data)
          await axios
            .post("http://192.168.56.101:1337/Cervezas", data, {
              headers: {
                Authorization: `Bearer ${tok}`,
              },
            })

        }
//===================================
            

// let hay=
// await axios.get( 
//   `http://localhost:1337/pais/count?pais=${data1.pais}`,
//           {
//             headers: {
//               Authorization: `Bearer ${this.token1}`,
//             },
//           }
        
//         );

//   //alert(hay.data,data1.pais);     
//  if (hay.data==0) { 
//               await axios
//             .post("http://localhost:1337/pais", data1, {
//               headers: {
//                 Authorization: `Bearer ${tok}`,
//               },
           
//             })
       
//  this.cargarpais(this.usuario.pais);
//      // alert(this.paises);
//            }
// //===================================
          

// //  this.paises.push(data1);
// //  alert(this.paises),

 

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

    mostrarSnackbar(){
       this.snackbar = true;
          this.textSnackbar = "Los datos fueron actualizados";
    }
  },
  mounted() {
    if (this.authenticated.estado === false) {
      this.authenticated.popup = true;
    }
  },
};
</script>
