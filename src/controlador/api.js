const path = 'https://esnutriapi.herokuapp.com'
export default{
    inicio_sesion : path + '/api/usuarios/inicio_sesion', 
    lista_producto: path + '/api/productos/all', 
    guardar_producto: path + '/api/productos/add',
    editar_producto: path + '/api/productos/update',
}