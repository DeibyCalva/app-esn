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
    guardar_producto(nombre, indicador, medidaPrevencion, recomendacion, call) {
        var producto = {
            nombre: nombre,
            indicador: indicador,
            medidaPrevencion: medidaPrevencion,
            recomendacion: recomendacion,
        }
        axios.post(path.guardar_producto, producto).then((response) => {
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

    editar_producto(id, nombre, indicador, medidaPrevencion, recomendacion, call) {
        var producto = {
            _id: id,
            nombre: nombre,
            indicador: indicador,
            medidaPrevencion: medidaPrevencion,
            recomendacion: recomendacion,
        }
        var url = path.editar_producto + "/" + id;
        axios.put(url, producto).then((response) => {
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