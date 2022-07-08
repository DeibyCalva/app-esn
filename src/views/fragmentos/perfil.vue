<template>
    <section>
        <v-container>
            <v-card>
                <v-card-title>
                    Mi Perfil
                    <v-spacer></v-spacer>
                </v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-text-field outlined label="Nombre" required v-model="nombre"
                                :error-messages="nombre_errors" @input="$v.nombre.$touch()" @blur="$v.nombre.$touch()">
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field outlined label="Correo" v-model="correo" :error-messages="correo_errors"
                                @input="$v.correo.$touch()" @blur="$v.correo.$touch()">
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                :type="show1 ? 'text' : 'password'" name="input-10-1" label="Contraseña"
                                @click:append="show1 = !show1">
                            </v-text-field>
                        </v-col>
                        <v-col cols="6" md="6">
                            <v-text-field v-model="password2" :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                                :type="show1 ? 'text' : 'password'" name="input-10-1" label="Confirmar Contraseña"
                                @click:append="show2 = !show2"></v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>

                <v-card-title>
                    <v-spacer></v-spacer>
                    <v-btn dark color="success" x-large style="margin-right: 2%;" @click="editar_usuario()">
                        <v-icon left large> mdi-content-save </v-icon>
                        Guardar Cambios
                    </v-btn>
                </v-card-title>

            </v-card>

        </v-container>

    </section>
</template>

<script>
import controlador from "../../controlador/usuario_controlador";
import cookie from "../../cookie/inicio_sesion";
import { required } from "vuelidate/lib/validators";
export default {
    name: 'admin_perfil',
    validations: {
        nombre: { required },
        correo: { required },
    },
    data: () => ({
        show1: false,
        show2: false,

        nombre: '',
        correo: '',
        password: '',
        password2: '',

    }),
    computed: {
        nombre_errors() {
            const errors = [];
            if (!this.$v.nombre.$dirty) return errors;
            !this.$v.nombre.required && errors.push("Este campo es obligatorio.");
            return errors;
        },
        correo_errors() {
            const errors = [];
            if (!this.$v.correo.$dirty) return errors;
            !this.$v.correo.required && errors.push("Este campo es obligatorio.");
            return errors;
        },
    },
    methods: {
        async buscar_usuario() {
            var cookieUsuario = cookie.getUsuario();
            controlador.buscar_usuario(cookieUsuario._id, (response) => {
                if (response.next == true) {
                    this.nombre = response.data.nombre;
                    this.correo = response.data.correo;
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
        },

        async editar_usuario() {
            this.$v.$touch();
            if (!this.$v.$invalid) {
                var cookieUsuario = cookie.getUsuario();
                var data = {};
                data.id = cookieUsuario._id;
                data.nombre = this.nombre;
                data.correo = this.correo;
                if ((this.password ?? "") != "") data.password = this.password;
                controlador.editar_usuario(data, (response) => {
                    if (response.next == true) {
                        this.$toast.open({
                            message: 'Usuario Editado',
                            type: "success",
                            duration: 5000,
                            position: "top-right",
                            pauseOnHover: true,
                        });
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
            }

        },
    },
    mounted() {
        this.buscar_usuario();
    }
}
</script>
