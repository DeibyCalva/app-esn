<template>
    <section>
        <v-container>
            <v-card>
                <v-card-title>
                    Productos
                    <v-spacer></v-spacer>
                    <v-btn dark color="success" x-large style="margin-right: 2%;" @click="borrar_datos()">
                        <v-icon left large> mdi-plus </v-icon>
                        Nuevo Producto
                    </v-btn>
                    <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details>
                    </v-text-field>

                </v-card-title>
                <v-data-table :headers="headers" :items="desserts" :search="search">

                    <template v-slot:[`item.accion`]="{ item }">
                        <v-menu bottom origin="center center" transition="scale-transition">
                            <template v-slot:activator="{ on, attrs }">
                                <v-icon color="primary" v-bind="attrs" v-on="on">
                                    mdi-dots-vertical
                                </v-icon>
                            </template>

                            <v-list>
                                <v-list-item-group>
                                    <v-list-item @click="llenar_datos(item)">
                                        <v-list-item-icon>
                                            <v-icon v-text="'mdi-pencil'" :color="'success'"></v-icon>
                                        </v-list-item-icon>
                                        <v-list-item-content>
                                            <v-list-item-title v-text="'Editar'"></v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list-item-group>
                            </v-list>
                        </v-menu>
                    </template>
                </v-data-table>
            </v-card>

        </v-container>

        <v-dialog v-model="dialog_producto" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="text-h5">Datos de producto</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12" md="6">
                                <v-text-field outlined label="Nombre de producto" required v-model="nombre"
                                    :error-messages="nombre_errors" @input="$v.nombre.$touch()"
                                    @blur="$v.nombre.$touch()">
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field outlined label="Indicador de etiqueta" v-model="indicador" required
                                :error-messages="indicador_errors" @input="$v.indicador.$touch()"
                                    @blur="$v.indicador.$touch()">
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" md="12">
                                <v-textarea outlined label="Medida de prevención" v-model="medidaPrevencion" required :error-messages="medidaPrevencion_errors" @input="$v.medidaPrevencion.$touch()"
                                    @blur="$v.medidaPrevencion.$touch()">
                                </v-textarea>
                            </v-col>
                            <v-col cols="12" md="12">
                                <v-textarea outlined label="Recomendación" v-model="recomendacion" required
                                :error-messages="recomendacion_errors" @input="$v.recomendacion.$touch()"
                                    @blur="$v.recomendacion.$touch()">
                                </v-textarea>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error darken-1" text @click="dialog_producto = false">
                        Cerrar
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="accion()">
                        Guardar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </section>
</template>

<script>
import { validationMixin } from "vuelidate";
import {
    required,
} from "vuelidate/lib/validators";

import controlador from "../../controlador/producto_controler";

export default {
    name: 'admin_producto',
    mixins: [validationMixin],
    validations: {
        nombre: { required },
        indicador: { required },
        medidaPrevencion: { required },
        recomendacion: { required },

    },
    data: () => ({
        op : true,
        search: '',
        dialog_producto: false,
        headers: [
            {
                text: 'Nombre',
                align: 'start',
                sortable: false,
                value: 'nombre',
            },
            { text: 'Indicador', sortable: false, value: 'indicador' },
            { text: 'Medida de prevención', sortable: false, value: 'medidaPrevencion' },
            { text: 'Recomendación', sortable: false, value: 'recomendacion' },
            { text: 'Accion', sortable: false, value: 'accion' },
        ],
        desserts: [],

        nombre: "",
        indicador: "",
        medidaPrevencion: "",
        recomendacion: "",
       // id:"",
        id:"",

    }),
    computed: {
        nombre_errors() {
            const errors = [];
            if (!this.$v.nombre.$dirty) return errors;
            !this.$v.nombre.required && errors.push("Este campo es obligatorio.");
            return errors;
        },
        indicador_errors() {
            const errors = [];
            if (!this.$v.indicador.$dirty) return errors;
            !this.$v.indicador.required && errors.push("Este campo es obligatorio.");
            return errors;
        },
        medidaPrevencion_errors() {
            const errors = [];
            if (!this.$v.medidaPrevencion.$dirty) return errors;
            !this.$v.medidaPrevencion.required && errors.push("Este campo es obligatorio.");
            return errors;
        },
        recomendacion_errors() {
            const errors = [];
            if (!this.$v.recomendacion.$dirty) return errors;
            !this.$v.recomendacion.required && errors.push("Este campo es obligatorio.");
            return errors;
        },
    },
    methods: {
        async listar_producto() {
            this.desserts = [];
            controlador.lista_producto((response) => {
                if (response.next == true) {
                    this.desserts = response.data.productos;
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
        async guardar_producto() {
            this.desserts = [];
            controlador.guardar_producto(this.nombre, this.indicador, this.medidaPrevencion, this.recomendacion, (response) => {
                if (response.next == true) {
                    this.dialog_producto = false;
                    this.listar_producto();
                    this.$toast.open({
                        message: 'Guardado correctamente',
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
        },
        async editar_producto() {
            this.desserts = [];
            controlador.editar_producto(this.id,this.nombre, this.indicador, this.medidaPrevencion, this.recomendacion, (response) => {
                if (response.next == true) {
                    this.dialog_producto = false;
                    this.listar_producto();
                    this.$toast.open({
                        message: 'Guardado correctamente',
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
        },
        llenar_datos(data) {
            this.id = data._id;
            this.nombre = data.nombre;
            this.indicador = data.indicador;
            this.medidaPrevencion = data.medidaPrevencion;
            this.recomendacion = data.recomendacion
            this.dialog_producto = true;
            this.op = false;
        },
        borrar_datos() {
            this.id = "";
            this.nombre = '';
            this.indicador = '';
            this.medidaPrevencion = '';
            this.recomendacion = '';
            this.dialog_producto = true;
            this.op = true;
            this.$v.$reset();
        },
        accion() {
            this.$v.$touch();
            if (!this.$v.$invalid) {
                if (this.op == true) {
                    this.guardar_producto()
                }else{
                    this.editar_producto();
                }
            }

        }
    },
    mounted() {
        this.listar_producto();
    }
}
</script>
