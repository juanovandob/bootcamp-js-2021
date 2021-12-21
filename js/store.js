let indice = 0;

const reducer = (state, action) => {
    if(action.type == "producto-agregado")
    {
        indice++;
        const producto = action.payload;
        //originalmente es así, pero para no repetir mucho action.payload, se le asigna a una variable
        //let total = action.payload.cantidad * action.payload.precio;   Queda asi
        const total = producto.cantidad * producto.precio;
        const codigo = indice;  //para mantener los nombres que estabamo usando
        return {
            ...state,
            productos: [
                ...state.productos,
                {
                    //...action.payload,
                    ...producto,
                    //codigo: indice,
                    codigo,
                    //total: total    - asi era originalmente y se simplifico a 
                    total
                }
                ]
            }
    }

    if(action.type == "producto-modificado")
    {
        const producto = action.payload;
        //Copio el arreglo original
        const productos = state.productos.slice();
        //recupero el codigo del producto a modificar
        const codigo = producto.codigo;
        const total = producto.cantidad * producto.precio;
        const old = productos.find((item) => item.codigo == codigo);
        //Encontrar la posicion en el arreglo del producto a modificar
        const index = productos.indexOf(old);
        //colocamos el producto ya modificado en la posicion del arreglo donde corresponde
        productos[index] = {...producto, total};
        
        //el estado de los productos existentes, mas el producto modificado
        return {
            ...state,
            productos
        }        
    }

    if(action.type == "producto-eliminado")
    {
        //Para eliminar el producto solo vamos a filtrar el arreglo de productos que no sean iguales al seleccionado,
        //y ese nuevo arreglo sin el eliminado se pinta en la UI
        const codigo = action.payload.codigo;
        const productos = state.productos.filter((item) => item.codigo != codigo);
        return{
            ...state,
            productos
        }
    }

    if(action.type == "producto-seleccionado")
    {
        const codigo = action.payload.codigo;
        return{
            ...state,
            producto: state.productos.find(x => x.codigo == codigo) || {} //si no hay producto retorne un objeto vacio
        }
    }

    return state;
};

