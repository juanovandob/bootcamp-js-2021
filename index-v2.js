
const form = document.getElementsByTagName("form")[0];

/** @type {HTMLInputElement} */
const inputCodigo = document.getElementById("codigo");

/** @type {HTMLInputElement} */
const inputNombre = document.getElementById("nombre");

/** @type {HTMLInputElement} */
const inputCantidad = document.getElementById("cantidad");

/** @type {HTMLInputElement} */
const inputPrecio = document.getElementById("precio");

/** @type {HTMLInputElement} */
const selectCategoria = document.getElementById("categoria");

const tbody = document.getElementsByTagName("tbody")[0];

const cantidadTotalElement = document.getElementById("cantidad-total");
const precioTotalElement = document.getElementById("precio-total");
const granTotalElement = document.getElementById("gran-total");


const preloadedState ={
    producto: {},
    productos: []
};

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

const store = Redux.createStore(reducer, preloadedState);

let latestState;

//Acá indicamos que es lo que se tiene que pintar en la UI - const unsuscribe ?
store.subscribe(() => {
    let currentState = store.getState();
    if(currentState != latestState)
    {
        latestState = currentState;
        console.log("estado: ", currentState);
        renderForm(currentState.producto);
        renderTable(currentState.productos)
    }
});

//Función que escribe en el formulario el producto seleccionado para editar
function renderForm(producto)
{
    inputCodigo.value = producto.codigo || "";
    inputNombre.value = producto.nombre || ""; //funciona como un if, si no hay nombre lo deja vacio
    inputCantidad.value = producto.cantidad || "";
    inputPrecio.value = producto.precio || "";
    selectCategoria.value = producto.categoria || 1;
}

//FUNCIÓN QUE DIBUJA LAS FILAS DE LA TABLA
function renderTable(productos){
        
    //Retorna un nuevo arreglo de filas que contienen codigo html por cada producto

    const filas = productos.map((item) => {
        const tr = document.createElement("tr");        
        tr.innerHTML = `
        <td>${item.codigo}</td>
        <td>${item.nombre}</td>
        <td>${item.cantidad}</td>
        <td>${item.precio}</td>
        <td>${item.total}</td>
        <td>
            <div class="btn-group">
                <a title="Editar" href="#" class="btn btn-sm btn-outline-secondary">
                    <i class="bi bi-pencil-square"></i>
                </a>
                <a title="Eliminar" href="#" class="btn btn-sm btn-outline-danger">
                    <i class="bi bi-trash"></i>
                </a>
            </div>
        </td>
        `;
        //const links = tr.getElementsByTagName("a");
        //const editar = links[0];
        //const eliminar = links[1];
        const [editar, eliminar] = tr.getElementsByTagName("a"); 

        //agregando eventos a los botones eliminar  y editar
        eliminar.addEventListener("click", (event) => {
            event.preventDefault();
            store.dispatch({
                type: "producto-eliminado",
                payload:{
                    codigo: item.codigo
                }
            })
        });

        editar.addEventListener("click", (event) =>{
            event.preventDefault();
            store.dispatch({
                type: "producto-seleccionado",
                payload:{
                    codigo: item.codigo
                }
            })
        });

        return tr;
    });
    //Se limpia la pantalla para que no haya repeticiones
    tbody.innerHTML= "";

    //Por cada elemento que existe en la funcion, agrega un tr (fila)
    filas.forEach((tr) => {
        tbody.appendChild(tr);
        });
    /*
    //para el footer de totales de la tabla
    //Se crea un arreglo con las cantidads               --reduce toma dos valores y los suma y se asigna un valor inicial de 0
    //const cantidadTotal = productos.map(x => x.cantidad).reduce((a,b) => a + b, 0);
    const cantidadTotal = productos
        .map(x => x.cantidad)
        .reduce((a,b) => a + b, 0); 

    const precioTotal = productos
        .map(x => x.precio)
        .reduce((a,b) => a + b, 0); 

    // const granTotal = productos
        .map(x => x.cantidad * x.precio)
        .reduce((a,b) => a + b, 0); 
    
    //Como ya se calculó el total arriba queda asi 

    const granTotal = productos
        .map(x => x.total)
        .reduce((a,b) => a + b, 0);

    cantidadTotalElement.innerText = cantidadTotal;
    precioTotalElement.innerText = precioTotal;
    granTotalElement.innerText = granTotal;
        */
       
    //PARA AHORRAR LINEAS DE CODIGO SE IMPLEMENTARIA DE LA SIGUIENTE FORMA
    cantidadTotalElement.innerText = sum(productos, x => x.cantidad);
    precioTotalElement.innerText = sum(productos, x => x.precio);
    granTotalElement.innerText = sum(productos, x => x.total);

    function sum(elementos, selector){
        return elementos
            .map(selector)
            .reduce((a,b) => a + b, 0);
    }

}

form.addEventListener("submit", onSubmit);

/**
 * 
 * @param {Event} event 
 */

function onSubmit(event)
{
    event.preventDefault();
    
    const data = new FormData(form);
    const values = Array.from(data.entries());
    
    const [frmCodigo, frmNombre,frmCantidad,frmPrecio,frmCategoria] = values;
    
    const codigo = parseInt(frmCodigo[1]);
    const nombre = frmNombre[1];
    const cantidad = parseFloat(frmCantidad[1]);
    const precio = parseFloat(frmPrecio[1]);
    const categoria = parseInt(frmCategoria[1]);

    if(codigo)
    {
        store.dispatch({
            type: "producto-modificado",
            payload:{
                codigo,
                nombre,
                cantidad,
                precio,
                categoria
            } 
        })
    }
    else{
        store.dispatch({
            type: "producto-agregado",
            payload:{
                nombre,
                cantidad,
                precio,
                categoria
            } 
        });
    }

    store.dispatch({
        type: "producto-seleccionado",
        payload:{
            codigo: null
        }
    });
    
}








