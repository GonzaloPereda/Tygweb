<template>
  <div>
    <v-toolbar color="blue" dark shaped>
      <v-toolbar-title>
        <h8>
          {{ titulo }}
        </h8>
      </v-toolbar-title>
      <v-spacer></v-spacer>

    </v-toolbar>
  </div>
</template>
<script>
export default {
  name: "Toolbarprop",
  props: {
    titulo: "",
  },
};
</script>
