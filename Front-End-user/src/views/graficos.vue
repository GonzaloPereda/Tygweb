<template>
  <v-container>
    <Toolbarprop titulo="Grafico de usuarios por pais" />
    <v-divider></v-divider>
    <v-card class="mx-auto mt-3">
      <v-row align="center" mb-1>
        <v-col cols="12" sm="6">
          <div class="text-center my-2">
            <v-lavel rounded small dark>
              Seleccionar un pais para visualizar los graficos
            </v-lavel>
          </div>
        </v-col>
        <v-col cols="12" sm="6">
          <v-select
            v-model="selected"
            :items="countr"
            menu-props="auto"
            label="Seleccionar"
            hide-details
            prepend-icon="mdi-map-marker"
            single-
            @change="graficousuarioporpais(selected)"
          ></v-select>
        </v-col>
        <v-col v-flex full-width v-if="habilitarG" cols="12">
          <GChart
            type="PieChart"
            :data="chartData"
            :options="chartOptions"
            :resizeDebounce="500"
          />
        </v-col>
      </v-row>
    </v-card>

 <v-card class="mx-auto mt-3">
      <v-row align="center" mb-1>
        <v-col cols="12" sm="6">
        </v-col>
        <v-col v-flex full-width v-if="habilitarG" cols="12">
          <GChart
            type="ColumnChart"
            :data="chartData"
            :options="chartOptions"
            :resizeDebounce="500"
          />
        </v-col>
      </v-row>
    </v-card>

  </v-container>
</template>
<script>
import Toolbarprop from "../components/Toolbar";
import Vue from "vue";
import VueGoogleCharts from "vue-google-charts";
import axios from "axios";
Vue.use(VueGoogleCharts);
import { mapState } from "vuex";
export default {
  components: {
    Toolbarprop,
  },
  computed: {
    ...mapState(["token1", "authenticated"]),
  },
  data() {
    return {
      habilitarG: false,
    //  selected: "Argentina",
     // paises: ["Iran", "Brazil", "France", "Spain"],
      countr:[],
      datostabla: {},
      chartData: [],
      femeninos: 0,
      masculinos: 0,
      pais: [],
      chartOptions: {
        chart: {
          title: "",
          subtitle: "",
        },
        height: 400,
        hAxis: {
          title: "usuarios por pais",
          titleTextStyle: { color: "green" },
        },
      },
    };
  },
  methods: {
    
    async graficousuarioporpais(p) {
      if (this.authenticated.estado === false) {
        this.authenticated.popup = true;
      } else {
         
                 this.masculinos = await axios.get( 
  `http://localhost:1337/usuariosaleatoreos/count?sexo=male&pais=${p}`,
          {
            headers: {
              Authorization: `Bearer ${this.token1}`,
            },
          }
        
        );

                 this.femeninos = await axios.get(
  `http://localhost:1337/usuariosaleatoreos/count?sexo=female&pais=${p}`,
          {
            headers: {
              Authorization: `Bearer ${this.token1}`,
            },
          }
        
        );

             this.pais = await axios.get(
  `http://localhost:1337/usuariosaleatoreos`,
          {
            headers: {
              Authorization: `Bearer ${this.token1}`,
            },
          }
        
        );

         var data2 = [["Sexo", "Cantidad"]];
          data2.push(["femeninos", this.femeninos.data]);
          data2.push(["masculinos", this.masculinos.data])
        this.chartData = data2;
        this.habilitarG = true;
      }
    },
  },
  mounted() {
    this.countr=this.paises;
    if (this.authenticated.estado === false) {
      this.authenticated.popup = true;
    }
  },
};
</script>
