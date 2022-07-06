import path from "./api";
import axios from "axios";

export default {    
    lista_producto(call) {
        axios.get(path.lista_producto)        
            .then((response) => {
                call({
                    next : true,
                    mensaje : '',
                    data : response.data,
                })
            })
            .catch((error) => {
                call({
                    next : false,
                    mensaje :  error.response.data.mensaje,
                })
            });
    }
}