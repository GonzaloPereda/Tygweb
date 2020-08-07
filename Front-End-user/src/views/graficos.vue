<template>
  <v-container>
    <Toolbarprop titulo="Personajes vivos y muertos" />
    <v-divider></v-divider>
    <v-card class="mx-auto mt-3">
      <v-row align="center" mb-1>
        <v-col cols="6" sm="6">
          <v-btn depressed small @click="graficos()" color="primary"
            >Mostrar estado</v-btn
          >
        </v-col>
        <v-col v-flex full-width v-if="habilitarG" cols="12">
          <GChart
            type="DonutChart"
            :data="chartData"
            :options="chartOptions"
            :resizeDebounce="500"
          />
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
        <v-col cols="12" sm="6"> </v-col>
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
import { mapMutations } from "vuex";
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

      datostabla: {},
      chartData: [],
      muerto: 0,
      vivo: 0,

      chartOptions: {
        chart: {
          title: "",
          subtitle: "",
        },
        height: 400,
        hAxis: {
          title: "Vivos y muertos",
          titleTextStyle: { color: "green" },
        },
      },
    };
  },
  methods: {
    ...mapMutations(["asignartoken", "authenticatedT"]),
    async logstrapi() {
      axios
        .post("http://localhost:1337/auth/local", {
          //.post("http://192.168.56.101:1337/auth/local", {
          identifier: "api-user@example.com",
          password: "123456",
        })
        .then((response) => {
          this.token = response.data.jwt;
          this.asignartoken(this.token);
        });
      this.authenticatedT();
      this.authenticated.popup = false;
    },
    async graficos() {
      this.logstrapi();
      if (1 === 2) {
        this.authenticated.popup = true;
      } else {
        this.muerto = await axios.get(
          `http://localhost:1337/personajes/count?status=Deceased`,
          {
            headers: {
              Authorization: `Bearer ${this.token1}`,
            },
          }
        );
        this.vivo = await axios.get(
          `http://localhost:1337/personajes/count?status=Alive`,
          {
            headers: {
              Authorization: `Bearer ${this.token1}`,
            },
          }
        );
        var data2 = [["Estado", "Cantidad"]];
        data2.push(["muertos", this.muerto.data]);
        data2.push(["vivos", this.vivo.data]);
        this.chartData = data2;
        this.habilitarG = true;
      }
    },
  },
};
</script>
