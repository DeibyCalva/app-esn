import path from "./api";
import axios from "axios";

export default {

    iniciar_sesion(correo, password, call) {
        const usuario = {
            correo: correo,
            password: password
        };
        axios.post(path.inicio_sesion, usuario)

            .then((response) => {
                call(response.data.usuario);
            })
            .catch((error) => {
                var mensaje = error?.response?.data?.mensaje ?? "Error de conexión";
                call({
                    tipo: "error",
                    mensaje: mensaje ?? "Error desconocido",
                    mensaje_alterno: error,
                });
            });
    },

    buscar_usuario(id, call) {
        var url = path.usuario_id + `/${id}`;
        axios.get(url)
            .then((response) => {
                call(response.data);
            })
            .catch((error) => {
                var mensaje = error?.response?.data?.mensaje ?? "Error de conexión";
                call({
                    tipo: "error",
                    mensaje: mensaje ?? "Error desconocido",
                    mensaje_alterno: error,
                });
            });
    },

    editar_usuario(data, call) {
        var url = path.editar_usuario + `/${data.id}`;
        axios.put(url, data)
            .then((response) => {
                call(response.data);
            })
            .catch((error) => {
                var mensaje = error?.response?.data?.mensaje ?? "Error de conexión";
                call({
                    tipo: "error",
                    mensaje: mensaje ?? "Error desconocido",
                    mensaje_alterno: error,
                });
            });
    }
}