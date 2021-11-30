//Obteniendo los datos del formulario (el primero) por eso se usa [0]
const form = document.getElementsByTagName("form")[0];

//Estas referencias a las ubicaciones de los campos del formulario sirven para editar los campos. Despues de recuperarlos
//se escribiran en estos campos. Utilizamos el id de los campos
/** @type {HTMLInputElement} */
const inputNombre = document.getElementById("nombre");

/** @type {HTMLInputElement} */
const inputCantidad = document.getElementById("cantidad");

/** @type {HTMLInputElement} */
const inputPrecio = document.getElementById("precio");

/** @type {HTMLInputElement} */
const selectCategoria = document.getElementById("categoria");

//Leemos los datos de tbody al igual que se hizo con form
const tbody = document.getElementsByTagName("tbody")[0];

//accediendo a los elementos del tfooter
const cantidadTotalElement = document.getElementById("cantidad-total");
const precioTotalElement = document.getElementById("precio-total");
const granTotalElement = document.getElementById("gran-total");

let indice = 0;
let cantidadTotal =0;
let preciosTotales =0;
let granTotal=0;

//Suscribiendonos al evento "Submit" del formulario y al pasar nos envia a la funcion "onSubmit" ("onSubmit lo 
//pusimos nosotros. puede ser cualquier nombre que nosotros le pongamos a la funcion")
form.addEventListener("submit", onSubmit);

/**
 * 
 * @param {Event} event 
 */

function onSubmit(event){
    event.preventDefault();
    
    const data = new FormData(form);
    const values = Array.from(data.entries());
    
    const [frmNombre,frmCantidad,frmPrecio,frmCategoria] = values;
    
    const nombre = frmNombre[1];
    const cantidad = frmCantidad[1];
    const precio = frmPrecio[1];
    const categoria = frmCategoria[1];

    //Calculando el total
    const total = cantidad * precio;

    //Cada vez que recarga la página crea un elemento tr.
    cantidadTotal = parseFloat(cantidad) + cantidadTotal;
    preciosTotales = parseFloat(precio) + preciosTotales;
    granTotal = parseFloat(total) + granTotal;
    
    //para el No es decir el indice de la fila
    indice ++;

    
    const tr = document.createElement("tr");
    
    //Para colocar la categoria en la fila. dataset.categoria es un metodo de javascript
    tr.dataset.categoria = categoria;
    
    //Se indica que tr es un elemento hijo de tbody . Se coloca dentro del body
    tbody.appendChild(tr);
    
    //utilizaremos literal string para escribir codigo html desde javascript 
    tr.innerHTML = `
        <td>${indice}</td>
        <td>${nombre}</td>
        <td>${cantidad}</td>
        <td>${precio}</td>
        <td>${total}</td>
        <td><a href="#" onclick="onEdit(event)">Editar</a> | <a href="#" onclick="onDelete(event)">Eliminar</a></td>
    `;

    cantidadTotalElement.innerText = cantidadTotal;
    precioTotalElement.innerText = preciosTotales;
    granTotalElement.innerText = granTotal;
    
    //limpiar el formulario
    form.reset();
}

/**
 * 
 * @param {Event} event 
 */
function onEdit(event){
    event.preventDefault();
    
    //indicamos al editor de codigo que tipo de variable estamos defiendo
    /** @type {HTMLElement} */
    const anchor = event.target;
    const tr = anchor.parentElement.parentElement;

    //Lee los datos de la fila que se seleccionó
    const celdas = tr.getElementsByTagName("td");

    const [tdCodigo, tdNombre, tdCantidad, tdPrecio] = celdas;
    
    inputNombre.value = tdNombre.innerText;
    inputCantidad.value = tdCantidad.innerText;
    inputPrecio.value = tdPrecio.innerText;
    selectCategoria.value = tr.dataset.categoria;

    console.log(celdas)

}


/**
 * 
 * @param {Event} event 
 */
function onDelete(event){
    //indicamos al editor de codigo que tipo de variable estamos defiendo
    /** @type {HTMLElement} */
    const anchor = event.target;
    //Nos da el elemento (donde esta el elemento) 
    //anchor.parentElement nos indica el <td> donde está el enlace ... si hacemos anchor.parentElement.parentElemente nos
    //indicara la <tr> o sea la fila a la que pertenece, es decir capturamos su ubicación. (en la tabla)
    const tr = anchor.parentElement.parentElement;
    
    //ahora como ya esta referenciado tbody le decimos que elimine ese tr especifico
    tbody.removeChild(tr);
}



