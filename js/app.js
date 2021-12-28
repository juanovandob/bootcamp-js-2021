const preloadedState ={
    producto: {},
    productos: []
};

const store = Redux.createStore(reducer, preloadedState);

let latestState;

//Acá indicamos que es lo que se tiene que pintar en la UI - const unsuscribe ?
store.subscribe(() => {
    let currentState = store.getState();
    if(currentState != latestState)
    {
        latestState = currentState;
        ui.renderForm(currentState.producto);
        ui.renderTable(currentState.productos)
    }
});

ui.onFormSubmit = (producto) => {
    if(producto.codigo)
    {
        store.dispatch(productoModificado(producto));
    }
    else{
        store.dispatch(productoAgregado(producto));
    }

    store.dispatch(productoSeleccionado(null)); //se hizo un action builder en store.js que devuelve el objeto igual que los otros dispatch
}

ui.onEliminarClick = (codigo) =>
{
    store.dispatch(productoEliminado(codigo));
}

/* ui.onEditarClick = (codigo) =>
{
        store.dispatch(productoSeleccionado(codigo));
} */
//tambien se utilizó el action builder que está en store.js

//el bloque comentado arriba se resume de la siguiente forma de arrow function
ui.onEditarClick = (codigo) => store.dispatch(productoSeleccionado(codigo));
