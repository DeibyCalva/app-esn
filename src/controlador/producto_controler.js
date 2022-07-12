import path from "./api";
import axios from "axios";

export default {
    lista_producto(call) {
        axios.get(path.lista_producto).then((response) => {

            call({
                next: true,
                mensaje: '',
                data: response.data,

            })
        }).catch((error) => {
            var mensaje = error?.response?.data?.mensaje ?? "Error de conexión";
            call({
                next: false,
                mensaje: mensaje,
            })
        });

    },

    guardar_producto(nombre, indicador, medidaPrevencion, recomendacion, imagen, call) {
        var producto = new FormData();
        producto.append('nombre', nombre);
        producto.append('indicador', indicador);
        producto.append('medidaPrevencion', medidaPrevencion);
        producto.append('recomendacion', recomendacion);
        producto.append('image', imagen);
        axios({
            method: "post",
            url: path.guardar_producto,
            data: producto,
            headers: { "Content-Type": "multipart/form-data" },
        }).then((response) => {
            call({
                next: true,
                mensaje: '',
                data: response.data,
            })
        }).catch((error) => {
            var mensaje = error?.response?.data?.mensaje ?? "Error de conexión";
            call({
                next: false,
                mensaje: mensaje,
            })
        });
    },

    editar_producto(id, nombre, indicador, medidaPrevencion, recomendacion, imagen, call) {
        var producto = new FormData();
        producto.append('nombre', nombre);
        producto.append('indicador', indicador);
        producto.append('medidaPrevencion', medidaPrevencion);
        producto.append('recomendacion', recomendacion);
        producto.append('image', imagen);
        var url = path.editar_producto + "/" + id;
        axios({
            method: "put",
            url: url,
            data: producto,
            headers: { "Content-Type": "multipart/form-data" },
        }).then((response) => {
            call({
                next: true,
                mensaje: '',
                data: response.data,
            })
        }).catch((error) => {
            var mensaje = error?.response?.data?.mensaje ?? "Error de conexión";
            call({
                next: false,
                mensaje: mensaje,
            })
        });
    },
    eliminar_producto(id, call) {
        var url = path.eliminar_producto + "/" + id;
        axios.delete(url).then((response) => {
            call({
                next: true,
                mensaje: '',
                data: response.data,
            })
        }).catch((error) => {
            var mensaje = error?.response?.data?.mensaje ?? "Error de conexión";
            call({
                next: false,
                mensaje: mensaje,
            })
        });
    }
}