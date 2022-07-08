
import Cookies from "js-cookie";

export default {
    auth : false,
    setUsuario(usuario) {
        Cookies.set("usuario", JSON.stringify(usuario));

    },
    getUsuario() {
        var usuario = Cookies.get("usuario");
        return JSON.parse(usuario);
    },

    cerrar_Sesion() {
        Cookies.remove('usuario')
        this.auth= false
    },
    checkAuth() {
        var _usuario = Cookies.get("usuario");
        if (_usuario != undefined) {
            this.auth = true
        }
        else {
            this.auth = false
        }
    },
};
