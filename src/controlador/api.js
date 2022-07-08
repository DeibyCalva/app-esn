const path = 'https://esnutriapi.herokuapp.com'
export default{
    //usuario
    inicio_sesion : path + '/api/usuarios/inicio_sesion',
    usuario_id : path + '/api/usuarios/infoUser',
    editar_usuario : path + '/api/usuarios/update_usuario',
    //producto 
    lista_producto: path + '/api/productos/all', 
    guardar_producto: path + '/api/productos/add',
    editar_producto: path + '/api/productos/update',
    eliminar_producto: path + '/api/productos/delete',
}