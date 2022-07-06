<template>
  <v-app>
    <v-app-bar color="#43a047" dark absolute>
      <v-spacer></v-spacer>

      <center>
        <h1 style="font-size: 5vh !important;">Administración ESNUTRI</h1>
      </center>

      <v-spacer></v-spacer>


      <v-menu offset-y>
        <template v-slot:activator="{ attrs, on }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-account-circle</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item link :to="{name:'Perfil'}">
            <v-list-item-title v-text="'Mi Perfil'"></v-list-item-title>
          </v-list-item>
          <v-list-item link :to="{name:'Producto'}">
            <v-list-item-title v-text="'Producto'"></v-list-item-title>
          </v-list-item>
          <v-list-item link @click="cerrar_sesion()">
            <v-list-item-title v-text="'Cerrar Sesión'"></v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main style="margin-top:8vh">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import cookie_inicio from "../cookie/inicio_sesion";

export default {
  name: 'HomeView',

  components: {
    //HelloWorld,
  },
  data: () => ({
    drawer: false
  }),
  methods: {
    cerrar_sesion() {
      cookie_inicio.cerrar_Sesion();
      this.$router.push({ name: 'Iniciar Sesion' }).catch(() => { });
    },
  },
}
</script>
