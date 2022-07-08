import path from "./api";
import axios from "axios";

export default {
    lista_producto(call) {
        axios.get(path.lista_producto)
            .then((response) => {
                call({
                    next: true,
                    mensaje: '',
                    data: response.data,
                })
            })
            .catch((error) => {
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
        axios.post(path.guardar_producto,producto)
            .then((response) => {
                call({
                    next: true,
                    mensaje: '',
                    data: response.data,
                })
            })
            .catch((error) => {
                var mensaje = error?.response?.data?.mensaje ?? "Error de conexión";
                call({
                    next: false,
                    mensaje: mensaje,
                })
            });
    },
    
    editar_producto(id,nombre, indicador, medidaPrevencion, recomendacion, call) {
        var producto = {
            _id:id,
            nombre: nombre,
            indicador: indicador,
            medidaPrevencion: medidaPrevencion,
            recomendacion: recomendacion,
        }
        console.log(producto)
        axios.put(path.editar_producto,producto)
            .then((response) => {
                call({
                    next: true,
                    mensaje: '',
                    data: response.data,
                })
            })
            .catch((error) => {
                var mensaje = error?.response?.data?.mensaje ?? "Error de conexión";
                call({
                    next: false,
                    mensaje: mensaje,
                })
            });
    }
}