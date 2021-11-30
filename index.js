//Obteniendo los datos del formulario (el primero) por eso se usa [0]
const form = document.getElementsByTagName("form")[0];

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
    indice ++;

    const tr = document.createElement("tr");
    
    //Se indica que tr es un elemento hijo de tbody . Se coloca dentro del body
    tbody.appendChild(tr);
    
    //utilizaremos literal string para escribir codigo html desde javascript 
    tr.innerHTML = `
        <td>${indice}</td>
        <td>${nombre}</td>
        <td>${cantidad}</td>
        <td>${precio}</td>
        <td>${total}</td>
        <td><a href="#">Editar</a> | <a href="#">Eliminar</a></td>
    `;

    cantidadTotalElement.innerText = cantidadTotal;
    precioTotalElement.innerText = preciosTotales;
    granTotalElement.innerText = granTotal;
    
    //limpiar el formulario
    form.reset();
}


/* const paragraphs = document.getElementsByTagName("p");

console.log(paragraphs);

if(paragraphs.length >0){
    const paragraph_change = paragraphs[0]; //Asignando el item 0 a paragraph_change
    paragraph_change.innerText = "Bienvenidos al Bootcamp - Texto cambiado con Javascript";
    //Se cambió el contenido de paragraphs[0]
}

if(paragraphs.length >1){
    const paragraph_change = paragraphs[1]; //Asignando el item 1 a paragraph_change
    const fecha = new Date(); //nos muestra la fecha
    paragraph_change.innerText = "Parrafos en el documento " + paragraphs.length + " " + fecha;
    //Se cambió el contenido de paragraphs[0]
} */

