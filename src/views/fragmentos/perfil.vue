<template>
    <section>
        <v-container>
            <v-card>
                <v-card-title>
                    Mi Perfil
                    <v-spacer></v-spacer>
                    <v-btn dark color="success" x-large style="margin-right: 2%;" @click="borrar_datos()">
                        <v-icon left large> mdi-pencil </v-icon>
                        Editar Perfil
                    </v-btn>
                </v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-text-field outlined label="Nombre" required v-model="nombre"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field outlined label="Correo" v-model="correo">
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                :type="show1 ? 'text' : 'password'" name="input-10-1" label="Contraseña"
                                @click:append="show1 = !show1"></v-text-field>
                        </v-col>
                        <v-col cols="6" md="6">
                            <v-text-field v-model="password2" :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                                :type="show1 ? 'text' : 'password'" name="input-10-1" label="Confirmar Contraseña"
                                @click:append="show2 = !show2"></v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>

            </v-card>

        </v-container>

    </section>
</template>

<script>
//import controlador from "../../controlador/producto_controler";

export default {
    name: 'admin_perfil',
    data: () => ({
        show1:false,
        show2:false,

        nombre:'',
        correo:'',
        password:'',
        password2:'',


    }),
    methods: {
    },
    mounted() {
    }
}
</script>
