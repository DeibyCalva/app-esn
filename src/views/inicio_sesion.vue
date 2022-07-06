<template>
  <v-app>

    <v-img src="@/assets/images/fondo.jpg" container style="align-items: center"
      gradient="rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)">
      <v-row justify="center" class="text-center" style="margin-top: -200px" align="center">
        <v-col cols="12" md="4" sm="12" align-self="center" class="text-center">
          <v-container>
            <v-card elevation="26" outlined shaped tile class="header-main "  style="color: #fff"
              width="100%">
              <br><br>
              <v-avatar style="margin-top: -200px" size="200">

                <img src="@/assets/images/logo.png" />
              </v-avatar>
              <h1>Iniciar Sesión</h1>
              <br />
              <v-row>
                <v-col>
                  <v-text-field dark append-icon="mdi-email" v-model="email" label="Identificación" required
                    color="white"></v-text-field>
                  <br />
                  <v-text-field dark :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" :type="show ? 'text' : 'password'"
                    v-model="password" label="Contraseña" color="white" required @click:append="show = !show">
                  </v-text-field>
                  <br />
                  <v-overlay :value="overlay" color="primary" fixed>
                    <v-progress-circular :size="70" :width="7" color="white" indeterminate></v-progress-circular>
                  </v-overlay>
                  <v-btn tile color="success" x-large @click="iniciar_sesion()"  width="100%">
                    <v-icon left> mdi-export </v-icon>
                    Ingresar
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-container>
        </v-col>
      </v-row>
    </v-img>
  </v-app>
</template>
 <script>
import controlador from "../controlador/inicio_sesion_controlador";
import cookie from "../cookie/inicio_sesion";
export default {
  name: "Inicio_sesion",
  data: () => ({
    overlay: false,
    show: false,
    email: "",
    password: "",
  }),
  methods: {
    async iniciar_sesion() {
      controlador.iniciar_sesion(this.email, this.password, (response) => {
        if (response.next == true) {
          cookie.setUsuario(response.data);
          this.$router.push({ name: 'Producto' }).catch(() => { });
        } else {
          this.$toast.open({
            message: response.mensaje,
            type: "error",
            duration: 5000,
            position: "top-right",
            pauseOnHover: true,
          });
        }
      });


      //  this.$router.push({ name: 'Inicio Administrador' }).catch(() => { });
    },
  },
};
</script>
<style scoped>
.header-main {
  max-width: 50vh;
  min-width: 335px;
  margin-top: 2vh;
  margin-bottom: 2vh;
  position: relative;
  z-index: 999;
  padding: 3em 2em;
  background: rgba(24, 22, 22, 0.04);
  -webkit-box-shadow: -1px 4px 28px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: -1px 4px 28px 0px rgba(0, 0, 0, 0.75);
  box-shadow: -1px 4px 28px 0px rgba(0, 0, 0, 0.75);
}
</style>